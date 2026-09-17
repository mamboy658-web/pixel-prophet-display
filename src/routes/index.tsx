import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
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
  CalendarDays,
  Crown,
  Zap,
  Star,
} from "lucide-react";
import leaderboardBanner from "@/assets/leaderboard-banner.jpg";

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
import sportyKickCarsAsset from "@/assets/sporty-packages-kick-cars.jpg.asset.json";
import sportyStrikerGlideSoccerAsset from "@/assets/sporty-packages-striker-glide-soccer.jpg.asset.json";
import sportyWomanSpeedGliderAsset from "@/assets/sporty-packages-woman-speed-glider.jpg.asset.json";
import { supabase } from "@/integrations/supabase/client";

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
  [
    "linear-gradient(180deg,#e03c31 25%,#007749 25%,#007749 50%,#001489 50%,#001489 75%,#ffb81c 75%)",
    "South Africa",
  ],
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
        <p className="text-lg font-black italic tracking-tight text-foreground">SPORTYBET</p>
        <p className="text-[10px] font-bold tracking-[0.2em] text-primary">STOCK MARKET</p>
      </div>
    </div>
  );
}

function SignUpModal({
  open,
  onClose,
  onRegistered,
}: {
  open: boolean;
  onClose: () => void;
  onRegistered: (email: string) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [remember, setRemember] = useState(true);
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [sportyId, setSportyId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!open) return null;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!/^\d{10}$/.test(sportyId)) {
      setError("Sporty ID must contain exactly 10 digits.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    const { error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { sporty_id: sportyId, display_name: "" },
      },
    });
    setSubmitting(false);

    if (signUpError) {
      const message = signUpError.message.toLowerCase();
      if (message.includes("already registered") || message.includes("already exists")) {
        setError("This email is already registered.");
      } else if (message.includes("sporty id") || message.includes("duplicate key")) {
        setError("This Sporty ID is already registered.");
      } else {
        setError(signUpError.message);
      }
      return;
    }

    onRegistered(email.trim());
  };

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
          <p className="text-2xl font-black italic tracking-tight text-white">SportyBet</p>
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
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">
            <input
              type="text"
              value={sportyId}
              onChange={(e) => setSportyId(e.target.value.replace(/\D/g, "").slice(0, 10))}
              placeholder="Sporty ID"
              inputMode="numeric"
              maxLength={10}
              className="w-full rounded-lg border border-primary bg-transparent px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              autoComplete="email"
              className="w-full rounded-lg border border-primary bg-transparent px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoComplete="new-password"
                className="w-full rounded-lg border border-primary bg-transparent px-4 py-3.5 pr-11 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
              </button>
            </div>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                autoComplete="new-password"
                className="w-full rounded-lg border border-primary bg-transparent px-4 py-3.5 pr-11 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirm ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {error && (
            <p role="alert" className="text-sm font-medium text-primary">
              {error}
            </p>
          )}

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
            disabled={submitting}
            className="mt-2 w-full rounded-lg bg-primary py-3.5 text-base font-bold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Registering..." : "Register"}
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
  initialEmail = "",
  notice = "",
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialEmail?: string;
  notice?: string;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!open) return null;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setSubmitting(false);

    if (signInError) {
      setError(
        signInError.message.toLowerCase().includes("email not confirmed")
          ? "Please confirm your email before logging in."
          : "Invalid email or password.",
      );
      return;
    }

    onSuccess();
  };

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
          <p className="text-2xl font-black italic tracking-tight text-white">SportyBet</p>
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
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              autoComplete="email"
              className="w-full rounded-lg border border-primary bg-transparent px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoComplete="current-password"
                className="w-full rounded-lg border border-primary bg-transparent px-4 py-3.5 pr-11 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {error && (
            <p role="alert" className="text-sm font-medium text-primary">
              {error}
            </p>
          )}
          {notice && (
            <p role="status" className="text-sm font-medium text-success">
              {notice}
            </p>
          )}

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
            disabled={submitting}
            className="mt-2 w-full rounded-lg bg-primary py-3.5 text-base font-bold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Logging in..." : "Login"}
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

const allInvestmentPackages = [
  ...investmentPackages,
  {
    name: "Sporty Kick",
    image: sportyKickCarsAsset.url,
    price: "$ 1.00",
    daily: "5%",
    days: "50",
    profit: "$ 2.50",
    stock: "2,000,000",
    imageClass: "w-[180px] max-w-none",
  },
  {
    name: "Sporty Cars",
    image: sportyKickCarsAsset.url,
    price: "$ 5.00",
    daily: "5%",
    days: "50",
    profit: "$ 12.50",
    stock: "1,000,000",
    imageClass: "-translate-y-[109px] w-[180px] max-w-none",
  },
  {
    name: "Sporty Striker",
    image: sportyStrikerGlideSoccerAsset.url,
    price: "$ 5.00",
    daily: "5.5%",
    days: "50",
    profit: "$ 13.75",
    stock: "1,000,000",
    imageClass: "w-[180px] max-w-none",
  },
  {
    name: "Sporty Glide",
    image: sportyStrikerGlideSoccerAsset.url,
    price: "$ 45.00",
    daily: "10%",
    days: "30",
    profit: "$ 135.00",
    stock: "50,000",
    imageClass: "-translate-y-[120px] w-[180px] max-w-none",
  },
  {
    name: "Sporty Soccer",
    image: sportyStrikerGlideSoccerAsset.url,
    price: "$ 1,500.00",
    daily: "20%",
    days: "40",
    profit: "$ 15,000.00",
    stock: "10",
    imageClass: "-translate-y-[240px] w-[180px] max-w-none",
  },
  {
    name: "Sporty Woman",
    image: sportyWomanSpeedGliderAsset.url,
    price: "$ 5.00",
    daily: "5%",
    days: "80",
    profit: "$ 20.00",
    stock: "1,000,000",
    imageClass: "w-[168px] max-w-none",
  },
  {
    name: "Sporty Speed",
    image: sportyWomanSpeedGliderAsset.url,
    price: "$ 15.00",
    daily: "7%",
    days: "45",
    profit: "$ 47.25",
    stock: "500,000",
    imageClass: "-translate-y-[106px] w-[168px] max-w-none",
  },
  {
    name: "Sporty Glide",
    image: sportyWomanSpeedGliderAsset.url,
    price: "$ 500.00",
    daily: "15%",
    days: "50",
    profit: "$ 3,750.00",
    stock: "50",
    imageClass: "-translate-y-[212px] w-[168px] max-w-none",
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

function InvestmentCard({ item }: { item: (typeof allInvestmentPackages)[number] }) {
  const isComposite = "imageClass" in item;

  return (
    <article className="grid h-[104px] grid-cols-[90px_minmax(0,1fr)_82px] items-center gap-2 rounded-lg border border-primary/35 bg-surface p-1.5 shadow-[0_0_12px_color-mix(in_oklab,var(--primary)_12%,transparent)]">
      <div className="relative h-[90px] overflow-hidden rounded-md bg-background">
        {isComposite ? (
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className={`absolute left-0 top-0 h-auto ${item.imageClass}`}
          />
        ) : (
          <PackageArtwork image={item.image} label={item.label} />
        )}
      </div>
      <div className="min-w-0 self-stretch py-1">
        <h3 className="mb-1 truncate text-[11px] font-bold leading-none">{item.name}</h3>
        {[
          ["Price", item.price],
          ["Daily profit", item.daily],
          ["Days", item.days],
          ["Total profit", item.profit],
          ["Total stock", item.stock],
        ].map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between gap-1 border-b border-border/60 py-px text-[9px] leading-[1.15] last:border-0"
          >
            <span className="text-muted-foreground">{label}</span>
            <span className="font-semibold">{value}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-end">
        <span className="inline-flex h-9 min-w-[80px] items-center justify-center rounded-full bg-success px-2 text-[10px] font-bold text-success-foreground">
          Invest Now
        </span>
      </div>
    </article>
  );
}

type LeaderPeriod = "Daily" | "Weekly" | "Monthly";

const leaderboardRows = [
  {
    rank: 1,
    id: "916482***91",
    tier: "VIP",
    daily: "489.25",
    weekly: "3,444.75",
    monthly: "4,892.75",
  },
  {
    rank: 2,
    id: "927361***04",
    tier: "Diamond",
    daily: "376.12",
    weekly: "2,632.84",
    monthly: "3,761.22",
  },
  {
    rank: 3,
    id: "903247***56",
    tier: "Platinum",
    daily: "298.42",
    weekly: "2,089.94",
    monthly: "2,984.17",
  },
  {
    rank: 4,
    id: "918540***33",
    tier: "Gold",
    daily: "263.15",
    weekly: "1,841.05",
    monthly: "2,631.48",
  },
  {
    rank: 5,
    id: "936217***71",
    tier: "Silver",
    daily: "228.79",
    weekly: "1,600.53",
    monthly: "2,287.90",
  },
  {
    rank: 6,
    id: "947832***12",
    tier: "Silver",
    daily: "190.44",
    weekly: "1,333.06",
    monthly: "1,904.36",
  },
  {
    rank: 7,
    id: "972614***88",
    tier: "Silver",
    daily: "156.28",
    weekly: "1,096.28",
    monthly: "1,562.75",
  },
  {
    rank: 8,
    id: "901753***45",
    tier: "Bronze",
    daily: "123.88",
    weekly: "863.62",
    monthly: "1,238.60",
  },
  {
    rank: 9,
    id: "958642***73",
    tier: "Bronze",
    daily: "98.75",
    weekly: "691.26",
    monthly: "987.45",
  },
  {
    rank: 10,
    id: "982736***28",
    tier: "Bronze",
    daily: "76.13",
    weekly: "533.91",
    monthly: "761.32",
  },
] as const;

const tierStyles: Record<string, string> = {
  VIP: "border-gold/60 text-gold",
  Diamond: "border-chart-3/60 text-chart-3",
  Platinum: "border-chart-4/60 text-chart-4",
  Gold: "border-gold/60 text-gold",
  Silver: "border-muted-foreground/60 text-muted-foreground",
  Bronze: "border-chart-1/60 text-chart-1",
};

const rewardCopy: Record<LeaderPeriod, { title: string; sub: string }> = {
  Daily: { title: "Daily Rewards", sub: "Smaller rewards. Keep the momentum!" },
  Weekly: { title: "Weekly Rewards", sub: "More activity. Bigger results." },
  Monthly: { title: "Monthly Rewards", sub: "Full monthly earnings." },
};

function LeaderboardSection() {
  const [period, setPeriod] = useState<LeaderPeriod>("Daily");
  const amountKey = period.toLowerCase() as "daily" | "weekly" | "monthly";

  return (
    <section aria-label="Leaderboard" className="space-y-2.5 bg-surface px-3 py-3 pb-[132px]">
      <img
        src={leaderboardBanner}
        alt="Top 10 people leaderboard"
        width={1280}
        height={512}
        loading="eager"
        className="w-full rounded-lg border border-primary/40"
      />

      <div
        role="tablist"
        aria-label="Leaderboard period"
        className="grid grid-cols-3 gap-1 rounded-full border border-primary/40 bg-background p-1"
      >
        {(["Daily", "Weekly", "Monthly"] as LeaderPeriod[]).map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={period === tab}
            onClick={() => setPeriod(tab)}
            className={`flex h-9 items-center justify-center gap-1.5 rounded-full text-[12px] font-bold transition-colors ${
              period === tab ? "bg-primary text-primary-foreground" : "text-foreground"
            }`}
          >
            <CalendarDays className="h-3.5 w-3.5" />
            {tab}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 rounded-lg border border-gold/50 bg-background px-3 py-2">
        <Crown className="h-6 w-6 text-gold" fill="currentColor" />
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-bold leading-tight">{rewardCopy[period].title}</p>
          <p className="text-[10px] font-medium leading-tight text-success">
            {rewardCopy[period].sub}
          </p>
        </div>
        <Zap className="h-5 w-5 text-primary" fill="currentColor" />
      </div>

      <div className="space-y-1.5">
        {leaderboardRows.map((row) => (
          <div
            key={row.rank}
            className={`flex items-center gap-2 rounded-lg border bg-background px-2 py-1.5 ${
              row.rank === 1
                ? "border-gold/60"
                : row.rank === 2
                  ? "border-chart-3/60"
                  : row.rank === 3
                    ? "border-chart-4/60"
                    : "border-primary/30"
            }`}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-[13px] font-bold">
              {row.rank}
            </span>
            <Trophy
              className={`h-6 w-6 shrink-0 ${
                row.rank === 1
                  ? "text-gold"
                  : row.rank === 2
                    ? "text-chart-3"
                    : row.rank === 3
                      ? "text-chart-4"
                      : row.rank <= 7
                        ? "text-muted-foreground"
                        : "text-chart-1"
              }`}
              fill="currentColor"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-semibold">ID: {row.id}</p>
              <span
                className={`mt-0.5 inline-flex items-center gap-1 rounded-md border bg-surface px-1.5 py-0.5 text-[9px] font-semibold ${tierStyles[row.tier]}`}
              >
                <Star className="h-2.5 w-2.5" fill="currentColor" />
                {row.tier}
              </span>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-semibold text-chart-3">{period} earnings</p>
              <p className="text-[13px] font-bold text-success">$ {row[amountKey]}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function InvestmentHome() {
  const [view, setView] = useState<"home" | "invest" | "leaderboard">("home");
  const showAllInvestments = view === "invest";
  const setShowAllInvestments = (v: boolean) => setView(v ? "invest" : "home");
  const navItems = [
    { icon: Home, label: "Home" },
    { icon: CircleDollarSign, label: "Invest" },
    { icon: RefreshCw, label: "Swap" },
    { icon: Trophy, label: "Leaderboard" },
    { icon: ReceiptText, label: "Income" },
    { icon: User, label: "Me", dot: true },
  ];

  return (
    <div className="min-h-screen bg-surface pb-[80px] text-foreground">
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
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success text-sm font-black">
                $
              </span>
              USD 0.36
            </div>
          </div>
        </header>

        <main>
          {view === "leaderboard" ? (
            <LeaderboardSection />
          ) : showAllInvestments ? (
            <section
              aria-label="All investment packages"
              className="space-y-2.5 bg-surface px-3 py-3 pb-[132px]"
            >
              {allInvestmentPackages.map((item, index) => (
                <InvestmentCard key={`${item.name}-${index}`} item={item} />
              ))}
            </section>
          ) : (
            <>
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
                    Start building your future now
                    <br />
                    with Spotty Bets stock investments.
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
                  <div
                    key={item.name}
                    className="aspect-[1.42] overflow-hidden rounded-md border border-border"
                  >
                    <PackageArtwork image={item.image} label={item.label} eager />
                  </div>
                ))}
              </section>

              <section className="px-3 pb-5">
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-[15px] font-bold">Investment Packages</h2>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAllInvestments(true);
                      window.scrollTo(0, 0);
                    }}
                    className="flex items-center gap-1 text-[10px] font-semibold"
                  >
                    View All <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="space-y-2.5">
                  {investmentPackages.map((item) => (
                    <InvestmentCard key={item.name} item={item} />
                  ))}
                </div>
              </section>
            </>
          )}
        </main>

        <div className="fixed bottom-[62px] right-[calc(max((100vw-390px)/2,0px)+10px)] z-40 flex flex-col items-center">
          <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-chart-3 text-primary-foreground shadow-xl">
            <Send className="h-6 w-6 -rotate-12 fill-current" />
            <span className="absolute right-0 top-0 h-3 w-3 rounded-full bg-primary" />
          </span>
          <span className="-mt-1 rounded-full bg-chart-3 px-2 py-0.5 text-[8px] text-primary-foreground">
            Join Channel
          </span>
        </div>

        <nav className="fixed inset-x-0 bottom-0 z-50 mx-auto grid h-[58px] max-w-[390px] grid-cols-6 border-t border-border bg-surface px-1">
          {navItems.map((item) => {
            const active =
              (item.label === "Home" && view === "home") ||
              (item.label === "Invest" && view === "invest") ||
              (item.label === "Leaderboard" && view === "leaderboard");
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  if (item.label === "Invest") setView("invest");
                  else if (item.label === "Home") setView("home");
                  else if (item.label === "Leaderboard") setView("leaderboard");
                  window.scrollTo(0, 0);
                }}
                className="relative flex flex-col items-center justify-center gap-1"
              >
                <item.icon
                  className={`h-5 w-5 ${item.label === "Leaderboard" ? "text-gold" : active ? "fill-foreground" : "text-foreground"}`}
                  strokeWidth={2.5}
                />
                {item.dot && (
                  <span className="absolute right-[25%] top-2 h-2.5 w-2.5 rounded-full bg-primary" />
                )}
                <span
                  className={`text-[8px] font-medium ${item.label === "Leaderboard" && active ? "text-gold" : ""}`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

function Index() {
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [authNotice, setAuthNotice] = useState("");

  useEffect(() => {
    let mounted = true;

    void supabase.auth.getSession().then(({ data }) => {
      if (mounted && data.session) setSignedIn(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted && session) setSignedIn(true);
      if (mounted && !session) setSignedIn(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const enterHome = () => {
    setLoginOpen(false);
    setSignUpOpen(false);
    setAuthNotice("");
    setSignedIn(true);
    window.scrollTo(0, 0);
  };

  const handleRegistered = (email: string) => {
    setSignUpOpen(false);
    setRegisteredEmail(email);
    setAuthNotice("You have successfully registered.");
    setLoginOpen(true);
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

      <LoginModal
        open={loginOpen}
        onClose={() => {
          setLoginOpen(false);
          setAuthNotice("");
        }}
        onSuccess={enterHome}
        initialEmail={registeredEmail}
        notice={authNotice}
      />
      <SignUpModal
        open={signUpOpen}
        onClose={() => setSignUpOpen(false)}
        onRegistered={handleRegistered}
      />

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
            <p className="mt-4 text-xl font-bold md:text-2xl">Live on SportyBet Stock Market.</p>
            <p className="mt-3 text-lg font-semibold text-muted-foreground">
              Watch. Invest. Earn. All in one app.
            </p>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Turn your passion for football into real income. Invest in live match opportunities
              and grow your wealth with Sportybet Stock Market.
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
          <p className="mt-2 text-lg font-bold">Invest From Anywhere. Grow With SportyBet.</p>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Join investors from different countries and be part of a global community where sports,
            strategy and crypto meet. Invest in real football markets and earn exciting returns —
            all on one platform.
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
                  <p className="text-xs text-muted-foreground">Our Official Payment Token</p>
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
          <p className="mt-1 text-xs text-muted-foreground">Small amounts. Big possibilities.</p>
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
          <p className="text-xl font-black tracking-widest text-gold">CASHBACK</p>
          <p className="mx-auto mt-5 max-w-xs text-sm text-muted-foreground">
            At the end of each year, the highest performing investor will receive 50% of their
            qualifying annual earnings or eligible investment amount.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">Terms &amp; conditions apply.</p>
        </div>

        {/* Countries */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="inline-flex items-center gap-2 text-sm font-black tracking-wide">
            <Globe className="h-4 w-4 text-primary" /> AVAILABLE IN MULTIPLE COUNTRIES
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">Invest globally. Play locally.</p>
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
              POWERED AND BACKED UP <span className="text-primary">STRONGLY BY SPORTYBET</span>
            </h3>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Your investment is secure with the trusted SportyBet platform — built on a solid
              foundation of technology, transparency and global expertise.
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
                Join thousands of smart investors who are already growing with SportyBet Stock
                Market.
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
