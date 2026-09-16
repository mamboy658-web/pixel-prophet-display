CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_sporty_id_format CHECK (sporty_id ~ '^[0-9]{10}$');
CREATE UNIQUE INDEX IF NOT EXISTS profiles_sporty_id_unique ON public.profiles (sporty_id);
CREATE UNIQUE INDEX IF NOT EXISTS profiles_email_unique ON public.profiles (lower(email));

CREATE TABLE public.wallet_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  type text NOT NULL CHECK (type IN ('deposit', 'investment', 'payout', 'withdrawal', 'adjustment')),
  amount numeric(14,2) NOT NULL CHECK (amount >= 0),
  balance_after numeric(14,2) NOT NULL CHECK (balance_after >= 0),
  reference_id uuid,
  description text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.wallet_transactions TO authenticated;
GRANT ALL ON public.wallet_transactions TO service_role;
ALTER TABLE public.wallet_transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their wallet transactions" ON public.wallet_transactions
  FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Users can add their wallet transactions" ON public.wallet_transactions
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "anon_select_packages" ON public.investment_packages;
DROP POLICY IF EXISTS "anon_insert_packages" ON public.investment_packages;
DROP POLICY IF EXISTS "anon_update_packages" ON public.investment_packages;
DROP POLICY IF EXISTS "anon_delete_packages" ON public.investment_packages;
GRANT SELECT ON public.investment_packages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.investment_packages TO authenticated;
GRANT ALL ON public.investment_packages TO service_role;
DROP POLICY IF EXISTS "Anyone can read active packages" ON public.investment_packages;
CREATE POLICY "Anyone can read active packages" ON public.investment_packages
  FOR SELECT TO anon, authenticated USING (is_active = true OR public.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can create packages" ON public.investment_packages
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can update packages" ON public.investment_packages
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can delete packages" ON public.investment_packages
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role));

GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
GRANT SELECT, INSERT, UPDATE ON public.investments TO authenticated;
GRANT ALL ON public.investments TO service_role;
GRANT SELECT, INSERT, UPDATE ON public.deposits TO authenticated;
GRANT ALL ON public.deposits TO service_role;
GRANT SELECT, INSERT, UPDATE ON public.withdrawals TO authenticated;
GRANT ALL ON public.withdrawals TO service_role;
GRANT SELECT, INSERT, UPDATE ON public.payouts TO authenticated;
GRANT ALL ON public.payouts TO service_role;

DROP POLICY IF EXISTS "Users can create pending investments" ON public.investments;
CREATE POLICY "Users can create investments through the balance function" ON public.investments
  FOR INSERT TO authenticated WITH CHECK (false);

CREATE OR REPLACE FUNCTION public.create_investment_from_balance(p_package_id uuid)
RETURNS public.investments
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  package_row public.investment_packages%ROWTYPE;
  profile_row public.profiles%ROWTYPE;
  investment_row public.investments%ROWTYPE;
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
  SELECT * INTO package_row FROM public.investment_packages WHERE id = p_package_id AND is_active = true FOR SHARE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Investment package not found'; END IF;
  SELECT * INTO profile_row FROM public.profiles WHERE user_id = auth.uid() FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Profile not found'; END IF;
  IF profile_row.balance < package_row.price THEN RAISE EXCEPTION 'Insufficient funds'; END IF;
  UPDATE public.profiles SET balance = balance - package_row.price WHERE user_id = auth.uid();
  INSERT INTO public.investments (user_id, package_id, amount, daily_profit_rate, duration_days, total_profit, status, started_at, ends_at)
  VALUES (auth.uid(), package_row.id, package_row.price, package_row.daily_profit_rate, package_row.duration_days, package_row.total_profit, 'active', now(), now() + make_interval(days => package_row.duration_days))
  RETURNING * INTO investment_row;
  INSERT INTO public.wallet_transactions (user_id, type, amount, balance_after, reference_id, description)
  VALUES (auth.uid(), 'investment', package_row.price, profile_row.balance - package_row.price, investment_row.id, package_row.name);
  RETURN investment_row;
END;
$$;
GRANT EXECUTE ON FUNCTION public.create_investment_from_balance(uuid) TO authenticated;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  sporty_id_value text := COALESCE(NEW.raw_user_meta_data ->> 'sporty_id', '');
BEGIN
  IF sporty_id_value !~ '^[0-9]{10}$' THEN RAISE EXCEPTION 'Sporty ID must contain exactly 10 digits'; END IF;
  INSERT INTO public.profiles (user_id, sporty_id, email, display_name)
  VALUES (NEW.id, sporty_id_value, NEW.email, COALESCE(NEW.raw_user_meta_data ->> 'display_name', ''));
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user') ON CONFLICT DO NOTHING;
  RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.admin_is_configured_email(p_email text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$ SELECT lower(COALESCE(p_email, '')) = 'standardking0@gmail.com' $$;
GRANT EXECUTE ON FUNCTION public.admin_is_configured_email(text) TO authenticated;

DROP POLICY IF EXISTS "Admins can manage deposits" ON public.deposits;
CREATE POLICY "Admins can manage deposits" ON public.deposits FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));
DROP POLICY IF EXISTS "Admins can manage withdrawals" ON public.withdrawals;
CREATE POLICY "Admins can manage withdrawals" ON public.withdrawals FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));
DROP POLICY IF EXISTS "Admins can manage payouts" ON public.payouts;
CREATE POLICY "Admins can manage payouts" ON public.payouts FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE OR REPLACE FUNCTION public.touch_profile_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
DROP TRIGGER IF EXISTS profiles_updated_at ON public.profiles;
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.touch_profile_updated_at();
CREATE OR REPLACE FUNCTION public.touch_package_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
DROP TRIGGER IF EXISTS investment_packages_updated_at ON public.investment_packages;
CREATE TRIGGER investment_packages_updated_at BEFORE UPDATE ON public.investment_packages FOR EACH ROW EXECUTE FUNCTION public.touch_package_updated_at();