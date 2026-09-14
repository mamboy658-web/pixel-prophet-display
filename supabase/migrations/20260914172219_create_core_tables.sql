/*
# Create core database tables for SportyBet Stock Market

## Overview
This migration creates the two main data tables that back the SportyBet Stock
Market app: investment packages and leaderboard entries. Both tables are
single-tenant (no user ownership) because the app does not yet have real
authentication — the sign-in/sign-up screens are mock and accept any values.

## New Tables

### 1. investment_packages
Stores the investment product catalog shown on the Home and Invest screens.
- `id` — UUID primary key
- `name` — display name (e.g. "Sporty Hero")
- `image_url` — URL to the package artwork image
- `price` — purchase price in USD, stored as numeric(12,2)
- `daily_profit_rate` — daily return percentage as numeric(5,2) (e.g. 5.00)
- `duration_days` — investment term length in days (integer)
- `total_profit` — total projected profit in USD, numeric(14,2)
- `total_stock` — total available units as text (values range from "10" to "2,000,000")
- `label` — the multi-line display label rendered on artwork (e.g. "SPORTY\nHERO")
- `sort_order` — integer controlling display order (lower = first)
- `is_active` — boolean, defaults true; inactive packages are hidden from the app
- `created_at` — row creation timestamp

### 2. leaderboard_entries
Stores the top-10 investor leaderboard rows shown on the Leaderboard screen.
- `id` — UUID primary key
- `rank` — integer rank (1 = top investor)
- `user_identifier` — masked user ID string (e.g. "916482***91")
- `tier` — membership tier text (VIP, Diamond, Platinum, Gold, Silver, Bronze)
- `daily_earnings` — numeric(12,2), earnings for the daily period
- `weekly_earnings` — numeric(12,2), earnings for the weekly period
- `monthly_earnings` — numeric(12,2), earnings for the monthly period
- `created_at` — row creation timestamp

## Security
- Row Level Security is enabled on both tables.
- Both tables use `TO anon, authenticated` policies (single-tenant / no real auth).
  The frontend Supabase client uses the anon key, so anon-level access is required
  for the app to read its own data. All four CRUD verbs (SELECT, INSERT, UPDATE,
  DELETE) are granted per table.

## Important Notes
1. The app currently has mock authentication (forms accept any input, no Supabase
   auth session). If real email/password auth is added later, these policies should
   be tightened to `TO authenticated` with ownership checks.
2. `total_stock` is stored as text because the app displays formatted strings like
   "1,000,000" and "2,000,000".
3. Seed data matching the app's current hardcoded values is inserted so the
   database is immediately usable.
*/

-- =============================================================
-- investment_packages
-- =============================================================

CREATE TABLE IF NOT EXISTS investment_packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  image_url text NOT NULL,
  price numeric(12,2) NOT NULL,
  daily_profit_rate numeric(5,2) NOT NULL,
  duration_days integer NOT NULL,
  total_profit numeric(14,2) NOT NULL,
  total_stock text NOT NULL,
  label text,
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE investment_packages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_packages" ON investment_packages;
CREATE POLICY "anon_select_packages" ON investment_packages FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_packages" ON investment_packages;
CREATE POLICY "anon_insert_packages" ON investment_packages FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_packages" ON investment_packages;
CREATE POLICY "anon_update_packages" ON investment_packages FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_packages" ON investment_packages;
CREATE POLICY "anon_delete_packages" ON investment_packages FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_investment_packages_sort
  ON investment_packages (sort_order);

-- =============================================================
-- leaderboard_entries
-- =============================================================

CREATE TABLE IF NOT EXISTS leaderboard_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  rank integer NOT NULL,
  user_identifier text NOT NULL,
  tier text NOT NULL,
  daily_earnings numeric(12,2) NOT NULL,
  weekly_earnings numeric(12,2) NOT NULL,
  monthly_earnings numeric(12,2) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE leaderboard_entries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_leaderboard" ON leaderboard_entries;
CREATE POLICY "anon_select_leaderboard" ON leaderboard_entries FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_leaderboard" ON leaderboard_entries;
CREATE POLICY "anon_insert_leaderboard" ON leaderboard_entries FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_leaderboard" ON leaderboard_entries;
CREATE POLICY "anon_update_leaderboard" ON leaderboard_entries FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_leaderboard" ON leaderboard_entries;
CREATE POLICY "anon_delete_leaderboard" ON leaderboard_entries FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_leaderboard_rank
  ON leaderboard_entries (rank);

-- =============================================================
-- Seed data: investment_packages
-- =============================================================

INSERT INTO investment_packages (name, image_url, price, daily_profit_rate, duration_days, total_profit, total_stock, label, sort_order)
VALUES
  ('Sporty Hero',          '', 1.00,    5.00, 40,    2.00,     '1,000,000', 'SPORTY\nHERO',      1),
  ('Sporty Jet',           '', 5.00,    5.00, 50,   12.50,     '1,000,000', 'SPORTY\nJET',       2),
  ('Sporty Drive',         '', 100.00, 10.00, 30,  300.00,     '10,000',    'SPORTY\nDRIVE',     3),
  ('Sporty Jet Ultra',     '', 150.00, 12.00, 45,  810.00,     '5,000',     'SPORTY\nJET ULTRA', 4),
  ('Sporty Kick',          '', 1.00,    5.00, 50,    2.50,     '2,000,000', NULL,                5),
  ('Sporty Cars',          '', 5.00,    5.00, 50,   12.50,     '1,000,000', NULL,                6),
  ('Sporty Striker',       '', 5.00,    5.50, 50,   13.75,     '1,000,000', NULL,                7),
  ('Sporty Glide',         '', 45.00,  10.00, 30,  135.00,     '50,000',    NULL,                8),
  ('Sporty Soccer',        '', 1500.00, 20.00, 40, 15000.00,   '10',        NULL,                9),
  ('Sporty Woman',         '', 5.00,    5.00, 80,   20.00,     '1,000,000', NULL,               10),
  ('Sporty Speed',         '', 15.00,   7.00, 45,   47.25,     '500,000',   NULL,               11),
  ('Sporty Glide Pro',     '', 500.00, 15.00, 50, 3750.00,     '50',        NULL,               12)
ON CONFLICT DO NOTHING;

-- =============================================================
-- Seed data: leaderboard_entries
-- =============================================================

INSERT INTO leaderboard_entries (rank, user_identifier, tier, daily_earnings, weekly_earnings, monthly_earnings)
VALUES
  (1,  '916482***91', 'VIP',       489.25,  3444.75,  4892.75),
  (2,  '927361***04', 'Diamond',   376.12,  2632.84,  3761.22),
  (3,  '903247***56', 'Platinum',  298.42,  2089.94,  2984.17),
  (4,  '918540***33', 'Gold',      263.15,  1841.05,  2631.48),
  (5,  '936217***71', 'Silver',    228.79,  1600.53,  2287.90),
  (6,  '947832***12', 'Silver',    190.44,  1333.06,  1904.36),
  (7,  '972614***88', 'Silver',    156.28,  1096.28,  1562.75),
  (8,  '901753***45', 'Bronze',    123.88,   863.62,  1238.60),
  (9,  '958642***73', 'Bronze',     98.75,   691.26,   987.45),
  (10, '982736***28', 'Bronze',     76.13,   533.91,   761.32)
ON CONFLICT DO NOTHING;
