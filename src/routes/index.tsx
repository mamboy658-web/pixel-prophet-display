import { createFileRoute } from "@tanstack/react-router";
import {
  Home,
  Play,
  LayoutGrid,
  Globe,
  Shield,
  User,
  Coins,
  BarChart3,
  Eye,
  Wallet,
  Trophy,
  Check,
  Bitcoin,
  ArrowRight,
} from "lucide-react";
import hero from "@/assets/hero.jpg";
import phoneCoins from "@/assets/phone-coins.jpg";
import chart from "@/assets/chart.jpg";
import coin from "@/assets/coin.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SportyBet Stock Market — Real Matches. Real Investment." },
      {
        name: "description",
        content:
          "Live on SportyBet Stock Market. Watch, invest and earn on live football matches with Sporty Coin (SPY).",
      },
      { property: "og:title", content: "SportyBet Stock Market" },
      {
        property: "og:description",
        content:
          "Turn your passion for football into real income. Invest in live match opportunities and grow your wealth.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const steps = [
  {
    icon: User,
    title: "Create your Sporty ID",
    desc: "Sign up and verify your account.",
  },
  {
    icon: Coins,
    title: "Fund with Sporty Coin",
    desc: "Deposit SPY (Sporty Coin) or crypto.",
  },
  {
    icon: BarChart3,
    title: "Invest at your choice",
    desc: "Minimum $1 | Maximum $1.5 (Max investment in the Game of the moment)",
  },
  {
    icon: Eye,
    title: "Watch & Earn",
    desc: "Track your investment in real time during live matches.",
  },
  {
    icon: Wallet,
    title: "Withdraw your earnings",
    desc: "Get paid through crypto to your Sporty ID wallet.",
  },
];

const cryptoPerks = [
  "Fast & secure transactions",
  "Low fees",
  "Global access",
  "Supported by SportyBet",
];

const countries: [string, string][] = [
  ["linear-gradient(90deg,#008751 33%,#fff 33%,#fff 66%,#008751 66%)", "Nigeria"],
  ["linear-gradient(180deg,#ce1126 33%,#fcd116 33%,#fcd116 66%,#006b3f 66%)", "Ghana"],
  ["linear-gradient(180deg,#000 30%,#bb1e10 30%,#bb1e10 70%,#006600 70%)", "Kenya"],
  ["linear-gradient(180deg,#e03c31 25%,#007749 25%,#007749 50%,#001489 50%,#001489 75%,#ffb81c 75%)", "South Africa"],
  ["linear-gradient(180deg,#000 33%,#fcdc04 33%,#fcdc04 66%,#d90000 66%)", "Uganda"],
  ["linear-gradient(180deg,#198a00 70%,#ef7d00 70%,#ef7d00 85%,#000 85%)", "Zambia"],
  ["linear-gradient(135deg,#1eb53a 40%,#fcd116 45%,#000 50%,#fcd116 55%,#00a3dd 60%)", "Tanzania"],
  ["linear-gradient(180deg,#b22234 50%,#3c3b6e 50%)", "USA"],
  ["linear-gradient(90deg,#012169 40%,#fff 40%,#fff 60%,#012169 60%)", "UK"],
  ["linear-gradient(90deg,#d80621 25%,#fff 25%,#fff 75%,#d80621 75%)", "Canada"],
];

function Flag({ bg, name }: { bg: string; name: string }) {
  return (
    <div className="text-center">
      <span
        aria-label={`${name} flag`}
        className="mx-auto block h-8 w-11 rounded-sm border border-border shadow"
        style={{ background: bg }}
      />
      <p className="mt-1 text-[11px] font-medium">{name}</p>
    </div>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-xl font-black text-primary-foreground shadow-[var(--glow-red)]">
        S
      </div>
      <div className="leading-none">
        <p className="text-lg font-black italic tracking-tight text-foreground">
          SPORTYBET
        </p>
        <p className="text-[10px] font-bold tracking-[0.2em] text-primary">
          STOCK MARKET
        </p>
      </div>
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border bg-surface/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Logo />
          <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
            <span className="inline-flex items-center gap-1.5 text-primary">
              <Home className="h-4 w-4" /> Home
            </span>
            <span>Packages</span>
            <span>Dashboard</span>
            <span>About</span>
            <span>Contact</span>
          </nav>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-primary px-5 py-1.5 text-sm font-semibold text-primary">
              Login
            </span>
            <span className="rounded-full bg-primary px-5 py-1.5 text-sm font-semibold text-primary-foreground">
              Sign Up
            </span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={hero}
            alt="Football players, racing car and rising market chart"
            width={1024}
            height={768}
            className="h-full w-full object-cover object-right opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/10" />
        </div>
        <div className="relative mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-2 md:py-20">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-primary">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
              LIVE FOOTBALL
            </p>
            <h1 className="mt-3 text-5xl font-black leading-[1.02] tracking-tight md:text-6xl">
              Real Matches.
              <br />
              <span className="text-primary">Real Investment.</span>
            </h1>
            <p className="mt-4 text-xl font-bold md:text-2xl">
              Live on SportyBet Stock Market.
            </p>
            <p className="mt-3 text-lg font-semibold text-muted-foreground">
              Watch. Invest. Earn. All in one app.
            </p>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Turn your passion for football into real income. Invest in live
              match opportunities and grow your wealth with Sportybet Stock
              Market.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-[var(--glow-red)]">
                <Play className="h-4 w-4 fill-current" /> Watch Live
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-bold text-foreground">
                <LayoutGrid className="h-4 w-4" /> View All Matches
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Global sports investment */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-2xl border border-border bg-gradient-to-br from-secondary to-surface p-6 md:p-8">
          <div className="flex items-center gap-3">
            <Globe className="h-9 w-9 text-primary" />
            <h2 className="text-2xl font-black tracking-tight md:text-3xl">
              GLOBAL <span className="text-primary">SPORTS INVESTMENT</span>
            </h2>
          </div>
          <p className="mt-2 text-lg font-bold">
            Invest From Anywhere. Grow With SportyBet.
          </p>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Join investors from different countries and be part of a global
            community where sports, strategy and crypto meet. Invest in real
            football markets and earn exciting returns — all on one platform.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_1fr_1fr]">
            {/* Phone + coins */}
            <div className="overflow-hidden rounded-xl border border-border">
              <img
                src={phoneCoins}
                alt="SportyBet app showing balance with gold Sporty Coins"
                loading="lazy"
                width={1024}
                height={1024}
                className="h-full w-full object-cover"
              />
            </div>

            {/* How it works */}
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="text-lg font-black tracking-wide">HOW IT WORKS</h3>
              <ol className="mt-4 space-y-4">
                {steps.map((s, i) => (
                  <li key={s.title} className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-black text-primary-foreground">
                      {i + 1}
                    </span>
                    <div className="flex gap-2.5">
                      <s.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <p className="text-sm font-bold">{s.title}</p>
                        <p className="text-xs text-muted-foreground">{s.desc}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Pay with crypto */}
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="inline-flex items-center gap-2 text-lg font-black tracking-wide">
                <Shield className="h-5 w-5 text-primary" /> PAY WITH CRYPTO
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Use Sporty Coin (SPY) for all investments and transactions.
              </p>
              <div className="mt-4 flex items-center gap-3 rounded-lg bg-secondary p-3">
                <img
                  src={coin}
                  alt="Sporty Coin"
                  loading="lazy"
                  width={512}
                  height={512}
                  className="h-14 w-14"
                />
                <div>
                  <p className="text-sm font-black">SPOTY COIN (SPY)</p>
                  <p className="text-xs text-muted-foreground">
                    Our Official Payment Token
                  </p>
                </div>
              </div>
              <ul className="mt-4 space-y-2">
                {cryptoPerks.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-success" /> {p}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-muted-foreground">
                Also accept other major cryptocurrencies
              </p>
              <div className="mt-2 flex gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f7931a]">
                  <Bitcoin className="h-5 w-5 text-white" />
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#627eea] text-sm font-black text-white">
                  Ξ
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#26a17b] text-sm font-black text-white">
                  ₮
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats row */}
      <section className="mx-auto grid max-w-6xl gap-6 px-4 pb-12 md:grid-cols-3">
        {/* Investment potential */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="inline-flex items-center gap-2 text-sm font-black tracking-wide">
            <BarChart3 className="h-4 w-4 text-primary" /> INVESTMENT POTENTIAL
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Small amounts. Big possibilities.
          </p>
          <div className="mt-3 inline-block rounded-lg border border-success/50 bg-success/10 px-4 py-2">
            <p className="text-2xl font-black text-success">UP TO 50%</p>
            <p className="text-[11px] font-bold tracking-wide text-success">
              POTENTIAL RETURN PER YEAR
            </p>
          </div>
          <div className="mt-3 overflow-hidden rounded-lg border border-border">
            <img
              src={chart}
              alt="Rising candlestick chart"
              loading="lazy"
              width={1024}
              height={700}
              className="h-36 w-full object-cover"
            />
          </div>
          <div className="mt-2 grid grid-cols-4 text-center text-xs">
            {[
              ["1 Month", "+12%"],
              ["3 Months", "+18%"],
              ["6 Months", "+32%"],
              ["1 Year", "+50%"],
            ].map(([label, val]) => (
              <div key={label}>
                <p className="text-muted-foreground">{label}</p>
                <p className="font-bold text-success">{val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top investor reward */}
        <div className="rounded-2xl border border-border bg-gradient-to-b from-secondary to-card p-5 text-center">
          <h3 className="inline-flex items-center gap-2 text-sm font-black tracking-wide">
            <Trophy className="h-4 w-4 text-gold" /> TOP INVESTOR REWARD
          </h3>
          <p className="mt-6 text-6xl font-black text-gold drop-shadow-[0_0_25px_oklch(0.82_0.16_85/0.4)]">
            50%
          </p>
          <p className="text-xl font-black tracking-widest text-gold">
            CASHBACK
          </p>
          <p className="mx-auto mt-5 max-w-xs text-sm text-muted-foreground">
            At the end of each year, the highest performing investor will
            receive 50% of their qualifying annual earnings or eligible
            investment amount.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            Terms &amp; conditions apply.
          </p>
        </div>

        {/* Countries */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="inline-flex items-center gap-2 text-sm font-black tracking-wide">
            <Globe className="h-4 w-4 text-primary" /> AVAILABLE IN MULTIPLE
            COUNTRIES
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Invest globally. Play locally.
          </p>
          <div className="mt-4 grid grid-cols-4 gap-x-2 gap-y-4">
            {countries.map(([flag, name]) => (
              <div key={name} className="text-center">
                <p className="text-3xl">{flag}</p>
                <p className="mt-1 text-[11px] font-medium">{name}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs font-bold text-primary">
            + More Countries Coming Soon
          </p>
        </div>
      </section>

      {/* Trust banner */}
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="flex flex-col items-center gap-6 rounded-2xl border border-border bg-gradient-to-r from-secondary via-surface to-secondary p-6 md:flex-row md:p-8">
          <Shield className="h-16 w-16 shrink-0 text-primary drop-shadow-[0_0_20px_oklch(0.58_0.24_27/0.6)]" />
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-black tracking-tight">
              POWERED AND BACKED UP{" "}
              <span className="text-primary">STRONGLY BY SPORTYBET</span>
            </h3>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Your investment is secure with the trusted SportyBet platform —
              built on a solid foundation of technology, transparency and
              global expertise.
            </p>
          </div>
          <div className="md:ml-auto">
            <Logo />
            <p className="mt-1 text-center text-[10px] font-bold tracking-[0.3em] text-muted-foreground">
              PLAY • INVEST • EARN
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <Logo />
            <div className="text-center md:text-left">
              <p className="font-bold">Ready to Start Your Investment Journey?</p>
              <p className="text-sm text-muted-foreground">
                Join thousands of smart investors who are already growing with
                SportyBet Stock Market.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-[var(--glow-red)]">
              Get Started Now <ArrowRight className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border pt-5 text-xs text-muted-foreground md:flex-row">
            <p>© 2025 SportyBet Stock Market. All rights reserved.</p>
            <div className="flex gap-5">
              <span>Terms &amp; Conditions</span>
              <span>Privacy Policy</span>
              <span>Contact Us</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
