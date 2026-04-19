import React, { useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { ArrowRight, Briefcase, UserPlus, LogIn, Eye, Zap, Shield, BarChart3, Layers, CheckCircle2, ChevronRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

// ── Animated gradient orb ─────────────────────────────────────────────────────
const Orb: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = '', style = {} }) => (
  <div className={`absolute rounded-full pointer-events-none ${className}`} style={style} />
);

// ── Stat card ─────────────────────────────────────────────────────────────────
const Stat: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center gap-1 px-8 py-6 border-r border-[#EEECE8] last:border-r-0">
    <span
      className="text-4xl font-extrabold tracking-tight text-[#0D0F17]"
      style={{ fontFamily: 'Sora, sans-serif' }}
    >
      {value}
    </span>
    <span className="text-sm text-[#6B7180] font-medium">{label}</span>
  </div>
);

// ── Feature card ──────────────────────────────────────────────────────────────
const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  accent: string;
}> = ({ icon, title, description, accent }) => (
  <div
    className="group relative flex flex-col gap-4 p-6 rounded-2xl border border-[#EEECE8] bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
  >
    {/* Hover gradient wash */}
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
      style={{ background: `radial-gradient(circle at 0% 0%, ${accent}18 0%, transparent 60%)` }}
    />
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center"
      style={{ background: `${accent}14`, color: accent }}
    >
      {icon}
    </div>
    <div>
      <h3
        className="text-base font-bold text-[#0D0F17] mb-1"
        style={{ fontFamily: 'Sora, sans-serif' }}
      >
        {title}
      </h3>
      <p className="text-sm text-[#6B7180] leading-relaxed">{description}</p>
    </div>
  </div>
);

// ── Check row ─────────────────────────────────────────────────────────────────
const Check: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex items-center gap-2.5">
    <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
    <span className="text-sm text-[#6B7180]">{label}</span>
  </div>
);

// ── Landing Page ──────────────────────────────────────────────────────────────
const LandingPage: React.FC = () => {
  const { user, enterGuestMode } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user, navigate]);

  const handleGuest = () => {
    enterGuestMode();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] relative">
      {/* ── Background decorative blobs ───────────────────────────────────── */}
      <Orb
        style={{
          top: '-18%',
          right: '-10%',
          width: 800,
          height: 800,
          background: 'radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 65%)',
        }}
      />
      <Orb
        style={{
          top: '5%',
          left: '-12%',
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(45,82,224,0.08) 0%, transparent 65%)',
        }}
      />

      {/* ── Subtle grid texture ───────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(13,15,23,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(13,15,23,0.025) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* ────────────────────────── NAV ──────────────────────────────────── */}
      <nav className="relative z-20 max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
              boxShadow: '0 2px 8px rgba(45,82,224,0.28)',
            }}
          >
            <Briefcase className="text-white w-4 h-4" />
          </div>
          <span
            className="font-extrabold text-[#0D0F17] text-[15px] tracking-tight"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            JobFlow
          </span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-6">
          {['Features', 'Pricing', 'About'].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm text-[#6B7180] hover:text-[#0D0F17] transition-colors font-medium"
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2">
          <RouterLink
            to="/login"
            className="hidden sm:block px-3.5 py-2 text-sm text-[#6B7180] hover:text-[#0D0F17] font-medium transition-colors"
          >
            Sign in
          </RouterLink>
          <RouterLink
            to="/register"
            className="px-4 py-2 text-sm font-semibold text-white rounded-lg transition-all hover:shadow-md"
            style={{ background: 'linear-gradient(135deg, #2D52E0 0%, #7C3AED 100%)' }}
          >
            Get started
          </RouterLink>
        </div>
      </nav>

      {/* ────────────────────────── HERO ─────────────────────────────────── */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pt-16 pb-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-[#EEECE8] rounded-full shadow-sm mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
          <span
            className="text-xs font-semibold text-[#0D0F17]"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            Now in open beta — free forever for individuals
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#0D0F17] leading-[1.08] mb-6"
          style={{ fontFamily: 'Sora, sans-serif' }}
        >
          Your job search,{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #2D52E0 30%, #7C3AED 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            finally organized.
          </span>
        </h1>

        {/* Sub */}
        <p className="text-[#6B7180] text-lg leading-relaxed max-w-xl mx-auto mb-10">
          JobFlow gives you a clean, powerful workspace to track applications, manage interviews,
          and land your next role — without the chaos of spreadsheets.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-5">
          <RouterLink
            to="/register"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #2D52E0 0%, #7C3AED 100%)', boxShadow: '0 4px 14px rgba(45,82,224,0.30)' }}
          >
            <UserPlus className="w-4 h-4" />
            Create free account
            <ArrowRight className="w-4 h-4" />
          </RouterLink>
          <RouterLink
            to="/login"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#0D0F17] bg-white border border-[#EEECE8] rounded-xl hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <LogIn className="w-4 h-4" />
            Sign in
          </RouterLink>
        </div>

        {/* Guest */}
        <button
          onClick={handleGuest}
          className="inline-flex items-center gap-1.5 text-xs text-[#9CA3AF] hover:text-[#6B7180] transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
          Continue without an account
          <ChevronRight className="w-3 h-3" />
        </button>
      </section>

      {/* ─────────────── HERO SCREENSHOT / VISUAL ────────────────────────── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-20">
        <div
          className="relative rounded-2xl overflow-hidden border border-[#EEECE8]"
          style={{ boxShadow: '0 24px 64px rgba(13,15,23,0.10), 0 4px 16px rgba(13,15,23,0.06)' }}
        >
          {/* Fake browser chrome */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#F5F4F1] border-b border-[#EEECE8]">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840]" />
            <div className="flex-1 flex justify-center">
              <div className="px-4 py-1 bg-white rounded-md border border-[#EEECE8] text-xs text-[#9CA3AF] font-medium">
                app.jobflow.io/dashboard
              </div>
            </div>
          </div>

          {/* Dashboard preview (stylized placeholder) */}
          <div className="bg-white p-6 min-h-[340px]">
            {/* Mini dashboard header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-28 h-5 bg-[#EEECE8] rounded-md animate-pulse" />
              </div>
              <div className="w-20 h-7 rounded-lg" style={{ background: 'linear-gradient(135deg, #2D52E0, #7C3AED)' }} />
            </div>

            {/* Kanban-style columns (visual only, no labels of kanban) */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: 'Applied', count: 12, color: '#2D52E0', cards: [65, 80, 50] },
                { label: 'Interview', count: 5, color: '#7C3AED', cards: [70, 55] },
                { label: 'Offer', count: 2, color: '#059669', cards: [85] },
                { label: 'Rejected', count: 8, color: '#6B7180', cards: [60, 75, 45] },
              ].map((col) => (
                <div key={col.label} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-[#0D0F17]" style={{ fontFamily: 'Sora, sans-serif' }}>{col.label}</span>
                    <span
                      className="text-xs font-bold px-1.5 py-0.5 rounded-full text-white"
                      style={{ background: col.color, fontSize: '10px' }}
                    >
                      {col.count}
                    </span>
                  </div>
                  {col.cards.map((w, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-[#EEECE8] bg-[#FAFAF8] p-3 flex flex-col gap-2"
                    >
                      <div className="h-3 rounded bg-[#EEECE8]" style={{ width: `${w}%` }} />
                      <div className="h-2 rounded bg-[#EEECE8]" style={{ width: '50%' }} />
                      <div
                        className="mt-1 self-start px-1.5 py-0.5 rounded-full text-white"
                        style={{ background: col.color, fontSize: '9px', fontFamily: 'Sora', fontWeight: 700 }}
                      >
                        {col.label}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────── STATS ────────────────────────────────── */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 pb-20">
        <div className="bg-white border border-[#EEECE8] rounded-2xl overflow-hidden" style={{ boxShadow: '0 4px 16px rgba(13,15,23,0.06)' }}>
          <div className="grid grid-cols-3">
            <Stat value="12k+" label="Job seekers" />
            <Stat value="98%" label="Satisfaction" />
            <Stat value="3x" label="Faster to offer" />
          </div>
        </div>
      </section>

      {/* ─────────────────────────── FEATURES ────────────────────────────── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-widest text-[#2D52E0] uppercase mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
            Everything you need
          </p>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-[#0D0F17] tracking-tight"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            Built for serious job seekers
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <FeatureCard
            icon={<Layers className="w-5 h-5" />}
            accent="#2D52E0"
            title="Pipeline Boards"
            description="Visualize your entire job search across stages — Applied, Interview, Offer, and beyond."
          />
          <FeatureCard
            icon={<BarChart3 className="w-5 h-5" />}
            accent="#7C3AED"
            title="Smart Analytics"
            description="Understand your response rates, interview conversion, and which companies are moving fast."
          />
          <FeatureCard
            icon={<Zap className="w-5 h-5" />}
            accent="#D97706"
            title="Quick Add"
            description="Log an application in seconds. Just paste a URL and JobFlow fills in the details automatically."
          />
          <FeatureCard
            icon={<Shield className="w-5 h-5" />}
            accent="#059669"
            title="Reminders & Follow-ups"
            description="Never let a hot lead go cold. Set follow-up reminders and get notified before deadlines."
          />
          <FeatureCard
            icon={<CheckCircle2 className="w-5 h-5" />}
            accent="#DC2626"
            title="Interview Prep"
            description="Attach notes, questions, and prep materials to each application, always at your fingertips."
          />
          <FeatureCard
            icon={<Briefcase className="w-5 h-5" />}
            accent="#2D52E0"
            title="Works Offline"
            description="Guest mode lets you get started instantly, no signup required. Sync to the cloud anytime."
          />
        </div>
      </section>

      {/* ──────────────────── BOTTOM CTA BAND ───────────────────────────── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
        <div
          className="relative overflow-hidden rounded-3xl px-8 py-14 text-center"
          style={{ background: 'linear-gradient(135deg, #1a2f8a 0%, #2D52E0 45%, #7C3AED 100%)' }}
        >
          {/* Decorative blobs inside CTA */}
          <div
            className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 65%)', transform: 'translate(30%, -40%)' }}
          />
          <div
            className="absolute bottom-0 left-0 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 65%)', transform: 'translate(-30%, 40%)' }}
          />

          <div className="relative z-10">
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3"
              style={{ fontFamily: 'Sora, sans-serif' }}
            >
              Ready to land your next role?
            </h2>
            <p className="text-white/70 text-base mb-8 max-w-md mx-auto">
              Join thousands of job seekers who organize smarter and interview more.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
              <RouterLink
                to="/register"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#2D52E0] text-sm font-bold rounded-xl hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                <UserPlus className="w-4 h-4" />
                Start for free
                <ArrowRight className="w-4 h-4" />
              </RouterLink>
              <button
                onClick={handleGuest}
                className="inline-flex items-center gap-1.5 px-6 py-3 text-sm font-semibold text-white/80 hover:text-white border border-white/20 rounded-xl hover:bg-white/10 transition-all"
              >
                <Eye className="w-4 h-4" />
                Try as guest
              </button>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <Check label="No credit card required" />
              <Check label="Free forever plan" />
              <Check label="Cancel anytime" />
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────── FOOTER ───────────────────────────────── */}
      <footer className="relative z-10 border-t border-[#EEECE8] py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}
            >
              <Briefcase className="text-white w-3.5 h-3.5" />
            </div>
            <span className="text-sm font-bold text-[#0D0F17]" style={{ fontFamily: 'Sora, sans-serif' }}>JobFlow</span>
          </div>
          <p className="text-xs text-[#9CA3AF]">© {new Date().getFullYear()} JobFlow. All rights reserved.</p>
          <div className="flex gap-5">
            {['Privacy', 'Terms', 'Contact'].map((link) => (
              <a key={link} href="#" className="text-xs text-[#9CA3AF] hover:text-[#6B7180] transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;