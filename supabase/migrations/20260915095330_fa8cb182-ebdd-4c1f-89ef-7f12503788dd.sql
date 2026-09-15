CREATE TABLE public.leaderboard_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  rank integer NOT NULL,
  user_identifier text NOT NULL,
  tier text NOT NULL,
  daily_earnings numeric(12,2) NOT NULL,
  weekly_earnings numeric(12,2) NOT NULL,
  monthly_earnings numeric(12,2) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.leaderboard_entries TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.leaderboard_entries TO authenticated;
GRANT ALL ON public.leaderboard_entries TO service_role;
ALTER TABLE public.leaderboard_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read leaderboard" ON public.leaderboard_entries FOR SELECT TO anon, authenticated USING (true);
INSERT INTO public.leaderboard_entries (rank, user_identifier, tier, daily_earnings, weekly_earnings, monthly_earnings) VALUES
(1, '916482***91', 'VIP', 489.25, 3444.75, 4892.75),
(2, '927361***04', 'Diamond', 376.12, 2632.84, 3761.22),
(3, '903247***56', 'Platinum', 298.42, 2089.94, 2984.17),
(4, '918540***33', 'Gold', 263.15, 1841.05, 2631.48),
(5, '936217***71', 'Silver', 228.79, 1600.53, 2287.90),
(6, '947832***12', 'Silver', 190.44, 1333.06, 1904.36),
(7, '972614***88', 'Silver', 156.28, 1096.28, 1562.75),
(8, '901753***45', 'Bronze', 123.88, 863.62, 1238.60),
(9, '958642***73', 'Bronze', 98.75, 691.26, 987.45),
(10, '982736***28', 'Bronze', 76.13, 533.91, 761.32);