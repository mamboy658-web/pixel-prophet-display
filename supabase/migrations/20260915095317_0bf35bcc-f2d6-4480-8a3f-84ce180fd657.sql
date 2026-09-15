CREATE TABLE public.investment_packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  image_url text NOT NULL DEFAULT '',
  description text,
  price numeric(12,2) NOT NULL,
  daily_profit_rate numeric(5,2) NOT NULL,
  duration_days integer NOT NULL,
  total_profit numeric(14,2) NOT NULL,
  total_stock text NOT NULL,
  label text,
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.investment_packages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.investment_packages TO authenticated;
GRANT ALL ON public.investment_packages TO service_role;
ALTER TABLE public.investment_packages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read active packages" ON public.investment_packages FOR SELECT TO anon, authenticated USING (is_active = true);
INSERT INTO public.investment_packages (name, image_url, price, daily_profit_rate, duration_days, total_profit, total_stock, label, sort_order) VALUES
('Sporty Hero', '', 1.00, 5.00, 40, 2.00, '1,000,000', 'SPORTY\nHERO', 1),
('Sporty Jet', '', 5.00, 5.00, 50, 12.50, '1,000,000', 'SPORTY\nJET', 2),
('Sporty Drive', '', 100.00, 10.00, 30, 300.00, '10,000', 'SPORTY\nDRIVE', 3),
('Sporty Jet Ultra', '', 150.00, 12.00, 45, 810.00, '5,000', 'SPORTY\nJET ULTRA', 4),
('Sporty Kick', '', 1.00, 5.00, 50, 2.50, '2,000,000', NULL, 5),
('Sporty Cars', '', 5.00, 5.00, 50, 12.50, '1,000,000', NULL, 6),
('Sporty Striker', '', 5.00, 5.50, 50, 13.75, '1,000,000', NULL, 7),
('Sporty Glide', '', 45.00, 10.00, 30, 135.00, '50,000', NULL, 8),
('Sporty Soccer', '', 1500.00, 20.00, 40, 15000.00, '10', NULL, 9),
('Sporty Woman', '', 5.00, 5.00, 80, 20.00, '1,000,000', NULL, 10),
('Sporty Speed', '', 15.00, 7.00, 45, 47.25, '500,000', NULL, 11),
('Sporty Glide Pro', '', 500.00, 15.00, 50, 3750.00, '50', NULL, 12);