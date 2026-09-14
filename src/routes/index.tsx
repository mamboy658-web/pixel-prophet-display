import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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
  EyeOff,
  X,
  Search,
  ChevronRight,
  RefreshCw,
  CircleDollarSign,
  ReceiptText,
  Send,
} from "lucide-react";
import hero from "@/assets/hero.jpg";
import phoneCoins from "@/assets/phone-coins.jpg";
import chart from "@/assets/chart.jpg";
import coin from "@/assets/coin.png";
import logoAsset from "@/assets/logo.jpg.asset.json";
import investmentHomeHero from "@/assets/investment-home-hero.jpg";
import sportyHeroAsset from "@/assets/sporty-hero-package.jpg.asset.json";
import sportyJetAsset from "@/assets/sporty-jet-package.jpg.asset.json";
import sportyDrive from "@/assets/sporty-drive-package.jpg";
import sportyJetUltra from "@/assets/sporty-jet-ultra-package.jpg";

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
      <img
        src={logoAsset.url}
        alt="SportyBet Stock Market logo"
        width={36}
        height={36}
        className="h-9 w-9 rounded-lg object-cover shadow-[var(--glow-red)]"
      />
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

function SignUpModal({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [remember, setRemember] = useState(true);
  const [keepSignedIn, setKeepSignedIn] = useState(true);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/80 backdrop-blur-sm sm:items-center"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative flex h-full w-full flex-col bg-background sm:h-auto sm:max-w-md sm:rounded-2xl sm:border sm:border-border sm:shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="Sign up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative flex items-center bg-primary px-5 py-4 sm:rounded-t-2xl">
          <p className="text-2xl font-black italic tracking-tight text-white">
            SportyBet
          </p>
          <button
            onClick={onClose}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-primary-foreground/80 hover:bg-white/10 hover:text-primary-foreground"
            aria-label="Close sign up"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form
          className="flex flex-1 flex-col gap-5 px-5 py-6 sm:flex-none"
          onSubmit={(e) => {
            e.preventDefault();
            onSuccess();
          }}
        >
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Spotify ID"
              className="w-full rounded-lg border border-primary bg-transparent px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-lg border border-primary bg-transparent px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full rounded-lg border border-primary bg-transparent px-4 py-3.5 pr-11 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <Eye className="h-5 w-5" />
                ) : (
                  <EyeOff className="h-5 w-5" />
                )}
              </button>
            </div>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full rounded-lg border border-primary bg-transparent px-4 py-3.5 pr-11 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirm ? (
                  <Eye className="h-5 w-5" />
                ) : (
                  <EyeOff className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="peer sr-only"
              />
              <span className="flex h-5 w-5 items-center justify-center rounded border border-primary bg-transparent text-primary-foreground peer-checked:border-0 peer-checked:bg-primary">
                <Check className="h-3.5 w-3.5" />
              </span>
              <span className="text-sm font-medium text-primary">Remember me</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
                className="peer sr-only"
              />
              <span className="flex h-5 w-5 items-center justify-center rounded border border-primary bg-transparent text-primary-foreground peer-checked:border-0 peer-checked:bg-primary">
                <Check className="h-3.5 w-3.5" />
              </span>
              <span className="text-sm font-medium text-primary">Keep me signed in</span>
            </label>
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-primary py-3.5 text-base font-bold text-primary-foreground"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

function LoginModal({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [keepSignedIn, setKeepSignedIn] = useState(true);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/80 backdrop-blur-sm sm:items-center"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative flex h-full w-full flex-col bg-background sm:h-auto sm:max-w-md sm:rounded-2xl sm:border sm:border-border sm:shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="Login"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative flex items-center bg-primary px-5 py-4 sm:rounded-t-2xl">
          <p className="text-2xl font-black italic tracking-tight text-white">
            SportyBet
          </p>
          <button
            onClick={onClose}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-primary-foreground/80 hover:bg-white/10 hover:text-primary-foreground"
            aria-label="Close login"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form
          className="flex flex-1 flex-col gap-5 px-5 py-6 sm:flex-none"
          onSubmit={(e) => {
            e.preventDefault();
            onSuccess();
          }}
        >
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-lg border border-primary bg-transparent px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full rounded-lg border border-primary bg-transparent px-4 py-3.5 pr-11 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <Eye className="h-5 w-5" />
                ) : (
                  <EyeOff className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="peer sr-only"
              />
              <span className="flex h-5 w-5 items-center justify-center rounded border border-primary bg-transparent text-primary-foreground peer-checked:border-0 peer-checked:bg-primary">
                <Check className="h-3.5 w-3.5" />
              </span>
              <span className="text-sm font-medium text-primary">Remember me</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
                className="peer sr-only"
              />
              <span className="flex h-5 w-5 items-center justify-center rounded border border-primary bg-transparent text-primary-foreground peer-checked:border-0 peer-checked:bg-primary">
                <Check className="h-3.5 w-3.5" />
              </span>
              <span className="text-sm font-medium text-primary">Keep me signed in</span>
            </label>
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-primary py-3.5 text-base font-bold text-primary-foreground"
          >
            Login
          </button>

          <div className="flex items-center justify-between text-sm font-medium text-success">
            <span className="cursor-pointer">Forgot Password?</span>
            <span className="cursor-pointer">Create New Account</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="h-px flex-1 bg-success" />
            <span className="text-sm font-medium text-foreground">Or</span>
            <span className="h-px flex-1 bg-success" />
          </div>

          <p className="text-center text-sm text-muted-foreground">
            To deactivate or reactivate your account{" "}
            <span className="cursor-pointer font-medium text-success">click here.</span>
          </p>
        </form>

        {/* Footer */}
        <div className="flex flex-col items-center justify-center gap-2 pb-6 pt-2 text-xs text-muted-foreground">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 text-muted-foreground/70"
            aria-hidden="true"
          >
            <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10Z" />
          </svg>
          <p>Powered by Spotybet @2026</p>
        </div>
      </div>
    </div>
  );
}

const investmentPackages = [
  {
    name: "Sporty Hero",
    image: sportyHeroAsset.url,
    price: "$ 1.00",
    daily: "5%",
    days: "40",
    profit: "$ 2.00",
    stock: "1,000,000",
    label: "SPORTY\nHERO",
  },
  {
    name: "Sporty Jet",
    image: sportyJetAsset.url,
    price: "$ 5.00",
    daily: "5%",
    days: "50",
    profit: "$ 12.50",
    stock: "1,000,000",
    label: "SPORTY\nJET",
  },
  {
    name: "Sporty Drive",
    image: sportyDrive,
    price: "$ 100.00",
    daily: "10%",
    days: "30",
    profit: "$ 300.00",
    stock: "10,000",
    label: "SPORTY\nDRIVE",
  },
  {
    name: "Sporty Jet Ultra",
    image: sportyJetUltra,
    price: "$ 150.00",
    daily: "12%",
    days: "45",
    profit: "$ 810.00",
    stock: "5,000",
    label: "SPORTY\nJET ULTRA",
  },
];

function PackageArtwork({
  image,
  label,
  eager = false,
}: {
  image: string;
  label: string;
  eager?: boolean;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-surface">
      <img
        src={image}
        alt=""
        loading={eager ? "eager" : "lazy"}
        width={768}
        height={768}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-surface via-surface/70 to-transparent" />
      <p className="absolute inset-x-1 bottom-2 whitespace-pre-line text-center text-[clamp(12px,3.4vw,25px)] font-black italic leading-[0.83] text-foreground drop-shadow-[0_2px_2px_var(--surface)]">
        {label}
      </p>
    </div>
  );
}

function InvestmentHome() {
  const navItems = [
    { icon: Home, label: "Home", active: true },
    { icon: CircleDollarSign, label: "Invest" },
    { icon: RefreshCw, label: "Swap" },
    { icon: Trophy, label: "Leaderboard" },
    { icon: ReceiptText, label: "Income" },
    { icon: User, label: "Me", dot: true },
  ];

  return (
    <div className="min-h-screen bg-surface pb-20 text-foreground">
      <div className="mx-auto min-h-screen w-full max-w-[390px] bg-surface shadow-2xl">
        <header className="sticky top-0 z-40 flex h-[50px] items-center justify-between bg-primary px-3">
          <div className="flex items-center gap-1.5">
            <img
              src={logoAsset.url}
              alt=""
              width={34}
              height={34}
              className="h-7 w-7 rounded-md object-cover"
            />
            <span className="text-xl font-black italic leading-none text-primary-foreground">
              SportyBet
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <Search className="h-5 w-5 text-primary-foreground" strokeWidth={3} />
            <div className="flex h-8 items-center gap-1.5 rounded-full border border-primary-foreground px-2 text-[11px] font-semibold text-primary-foreground">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success text-sm font-black">$</span>
              USD 0.36
            </div>
          </div>
        </header>

        <main>
          <section className="relative h-[130px] overflow-hidden">
            <img
              src={investmentHomeHero}
              alt="Football player holding a flaming ball"
              width={1440}
              height={600}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/70 to-transparent" />
            <div className="relative z-10 px-3 pt-3.5">
              <h1 className="text-[16px] font-extrabold leading-tight">
                <span className="text-primary">Invest</span> in your future.
              </h1>
              <p className="mt-1 max-w-[180px] text-[10px] font-medium leading-snug">
                Start building your future now<br />with Spotty Bets stock investments.
              </p>
              <span className="mt-1.5 block h-0.5 w-6 bg-primary" />
              <span className="mt-2 inline-flex h-8 items-center gap-3 rounded-full bg-primary px-4 text-xs font-bold text-primary-foreground">
                <Wallet className="h-4 w-4 fill-current" /> Deposit
                <ChevronRight className="h-4 w-4" />
              </span>
            </div>
          </section>

          <section className="grid grid-cols-3 gap-1.5 px-3 py-2">
            {investmentPackages.slice(0, 3).map((item) => (
              <div key={item.name} className="aspect-[1.42] overflow-hidden rounded-md border border-border">
                <PackageArtwork image={item.image} label={item.label} eager />
              </div>
            ))}
          </section>

          <section className="px-3 pb-5">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-[15px] font-bold">Investment Packages</h2>
              <span className="flex items-center gap-1 text-[10px] font-semibold">View All <ChevronRight className="h-3.5 w-3.5" /></span>
            </div>
            <div className="space-y-2">
              {investmentPackages.map((item) => (
                <article key={item.name} className="grid h-[96px] grid-cols-[82px_1fr_78px] gap-3 rounded-md border border-border p-1.5">
                  <div className="h-[82px] overflow-hidden rounded-md">
                    <PackageArtwork image={item.image} label={item.label} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="mb-1 text-[11px] font-bold">{item.name}</h3>
                    {[
                      ["Price", item.price],
                      ["Daily profit", item.daily],
                      ["Days", item.days],
                      ["Total profit", item.profit],
                      ["Total stock", item.stock],
                    ].map(([label, value]) => (
                      <div key={label} className="flex items-center justify-between gap-1 border-b border-border/60 py-px text-[8px] leading-[1.15] last:border-0">
                        <span className="text-muted-foreground">{label}</span>
                        <span className="font-semibold">{value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-end">
                    <span className="inline-flex h-8 min-w-[76px] items-center justify-center rounded-full bg-success px-2 text-[9px] font-semibold text-success-foreground">
                      Invest Now
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>

        <div className="fixed bottom-[62px] right-[calc(max((100vw-390px)/2,0px)+10px)] z-40 flex flex-col items-center">
          <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-chart-3 text-primary-foreground shadow-xl">
            <Send className="h-6 w-6 -rotate-12 fill-current" />
            <span className="absolute right-0 top-0 h-3 w-3 rounded-full bg-primary" />
          </span>
          <span className="-mt-1 rounded-full bg-chart-3 px-2 py-0.5 text-[8px] text-primary-foreground">Join Channel</span>
        </div>

        <nav className="fixed inset-x-0 bottom-0 z-50 mx-auto grid h-[58px] max-w-[390px] grid-cols-6 border-t border-border bg-surface px-1">
          {navItems.map((item) => (
            <div key={item.label} className="relative flex flex-col items-center justify-center gap-1">
              <item.icon className={`h-5 w-5 ${item.active ? "fill-foreground" : item.label === "Leaderboard" ? "text-gold" : "text-foreground"}`} strokeWidth={2.5} />
              {item.dot && <span className="absolute right-[25%] top-2 h-2.5 w-2.5 rounded-full bg-primary" />}
              <span className="text-[8px] font-medium">{item.label}</span>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}

function Index() {
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  const enterHome = () => {
    setLoginOpen(false);
    setSignUpOpen(false);
    setSignedIn(true);
    window.scrollTo(0, 0);
  };

  if (signedIn) return <InvestmentHome />;

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
            <button
              onClick={() => setLoginOpen(true)}
              className="rounded-full border border-primary px-5 py-1.5 text-sm font-semibold text-primary"
            >
              Login
            </button>
            <button
              onClick={() => setSignUpOpen(true)}
              className="rounded-full bg-primary px-5 py-1.5 text-sm font-semibold text-primary-foreground"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} onSuccess={enterHome} />
      <SignUpModal open={signUpOpen} onClose={() => setSignUpOpen(false)} onSuccess={enterHome} />

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
            {countries.map(([bg, name]) => (
              <Flag key={name} bg={bg} name={name} />
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
