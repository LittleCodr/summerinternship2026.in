"use client";

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Download,
  CheckCircle2,
  Clock,
  Smartphone,
  ShieldCheck,
  Sparkles,
  Star,
  BookOpen,
  ChevronDown,
  ChevronUp,
  ArrowDown,
  ArrowRight,
  AlertCircle,
  Cpu,
  Layers,
  HardDrive,
  FileCheck,
  Check,
  Zap,
  Info,
  Shield,
  Award,
  PlayCircle,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const STAGE_DURATION = 20; // 20s psychological timer per stage = 60s total dwell time
const DEFAULT_TARGET = 'https://videynow.com/s/1Oc6UAVZA0S8EVTciI_-WMQ';

// Safe base64 decoding helper
const safeDecode = (str: string): string | null => {
  try {
    const decoded = decodeURIComponent(escape(atob(str)));
    if (decoded.startsWith('http://') || decoded.startsWith('https://')) {
      return decoded;
    }
  } catch {
    if (str.startsWith('http://') || str.startsWith('https://')) {
      return str;
    }
  }
  return null;
};

function SafelinkContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const hopParam = searchParams.get('hop');
  const rawUrlParam = searchParams.get('url') || searchParams.get('target') || searchParams.get('data');

  // Resolve target URL
  const [destinationUrl, setDestinationUrl] = useState<string>(() => {
    if (rawUrlParam) {
      const decoded = safeDecode(rawUrlParam);
      if (decoded) return decoded;
    }
    return DEFAULT_TARGET;
  });

  // If ID provided, try fetching from Firestore REST API
  useEffect(() => {
    if (id) {
      fetch(`https://firestore.googleapis.com/v1/projects/internship-in/databases/(default)/documents/safelinks/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.fields?.targetUrl?.stringValue) {
            setDestinationUrl(data.fields.targetUrl.stringValue);
          }
        })
        .catch(() => {
          fetch(`https://firestore.googleapis.com/v1/projects/fellowship-in/databases/(default)/documents/safelinks/${id}`)
            .then((res) => res.json())
            .then((data) => {
              if (data?.fields?.targetUrl?.stringValue) {
                setDestinationUrl(data.fields.targetUrl.stringValue);
              }
            })
            .catch(() => {});
        });
    }
  }, [id]);

  // Interactive Engagement States - Timers DO NOT start automatically! User must engage.
  const [stage1Started, setStage1Started] = useState(false);
  const [stage1Completed, setStage1Completed] = useState(false);
  const [timer1, setTimer1] = useState(STAGE_DURATION);

  const [stage2Started, setStage2Started] = useState(false);
  const [stage2Completed, setStage2Completed] = useState(false);
  const [timer2, setTimer2] = useState(STAGE_DURATION);

  const [stage3Started, setStage3Started] = useState(false);
  const [stage3Completed, setStage3Completed] = useState(false);
  const [timer3, setTimer3] = useState(STAGE_DURATION);

  const [isTabHidden, setIsTabHidden] = useState(false);

  // FAQ Accordion state
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Scroll Refs
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);

  // Pause timers if user leaves tab
  useEffect(() => {
    const handleVisibility = () => {
      setIsTabHidden(document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Stage 1 Timer (starts only when user clicks start)
  useEffect(() => {
    if (stage1Started && !stage1Completed) {
      if (isTabHidden) return;
      const interval = setInterval(() => {
        setTimer1((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setStage1Completed(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [stage1Started, stage1Completed, isTabHidden]);

  // Stage 2 Timer (starts only when user clicks start)
  useEffect(() => {
    if (stage2Started && !stage2Completed) {
      if (isTabHidden) return;
      const interval = setInterval(() => {
        setTimer2((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setStage2Completed(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [stage2Started, stage2Completed, isTabHidden]);

  // Stage 3 Timer (starts only when user clicks start)
  useEffect(() => {
    if (stage3Started && !stage3Completed) {
      if (isTabHidden) return;
      const interval = setInterval(() => {
        setTimer3((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setStage3Completed(true);
            try {
              confetti({ particleCount: 80, spread: 80, origin: { y: 0.7 } });
            } catch {
              // ignore
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [stage3Started, stage3Completed, isTabHidden]);

  const handleScrollToStage2 = () => {
    setTimeout(() => {
      section2Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleScrollToStage3 = () => {
    setTimeout(() => {
      section3Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleOpenDestination = () => {
    try {
      confetti({ particleCount: 100, spread: 90, origin: { y: 0.6 } });
    } catch {
      // ignore
    }
    window.location.href = destinationUrl;
  };

  const currentActiveTimer = !stage1Completed ? timer1 : !stage2Completed ? timer2 : timer3;
  const isAnyTimerRunning = (stage1Started && !stage1Completed) || (stage2Started && !stage2Completed) || (stage3Started && !stage3Completed);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-emerald-600 selection:text-white">
      {/* STICKY TOP APP DOWNLOAD PROGRESS HEADER */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm px-4 py-3">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 font-black text-xl">
              α
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-600">
                  Step 3 of 3: Direct Download Mirror
                </span>
                <span className="px-2 py-0.5 text-[10px] rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                  {stage3Completed ? '100% Ready' : '90% Ready • Almost there!'}
                </span>
              </div>
              <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                <span>Alpha Study Squad APK</span>
                <span>•</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Clean (28.4 MB)
                </span>
              </div>
            </div>
          </div>

          {/* Active Timer Pill / Pause Notification */}
          <div className="flex items-center gap-3">
            {isTabHidden ? (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-800 text-xs font-bold animate-pulse">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>Timer Paused: Keep page open to load APK</span>
              </div>
            ) : isAnyTimerRunning ? (
              <div className="flex items-center gap-2.5 bg-slate-100 px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-inner">
                <div className="text-right">
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Verification Clock</div>
                  <div className="text-base font-black font-mono text-slate-900 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-600 animate-spin" style={{ animationDuration: '3s' }} />
                    {currentActiveTimer}s
                  </div>
                </div>
                {/* 20s progress mini bar */}
                <div className="w-12 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 transition-all duration-1000 ease-linear rounded-full"
                    style={{ width: `${((STAGE_DURATION - currentActiveTimer) / STAGE_DURATION) * 100}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-slate-700 font-semibold bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Ready for Final Download</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* BREADCRUMB */}
      <div className="bg-slate-100 border-b border-slate-200 py-2.5 px-4">
        <div className="max-w-4xl mx-auto text-xs font-medium text-slate-500 flex items-center gap-2">
          <a href="/" className="hover:text-emerald-600 transition-colors">Home</a>
          <span className="text-slate-400">/</span>
          <span className="text-slate-600">Downloads</span>
          <span className="text-slate-400">/</span>
          <span className="text-slate-900 font-semibold truncate">Alpha Study Squad APK (v3.4.2) • Final Step</span>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-10">

        {/* HERO APP SHOWCASE HEADER */}
        <header className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-8">
          <div className="relative group shrink-0">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-3xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-cyan-500 flex items-center justify-center text-white shadow-xl shadow-emerald-600/30">
              <span className="text-6xl md:text-7xl font-black tracking-tighter">α</span>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-emerald-600 text-white rounded-full p-1.5 shadow-md border-2 border-white">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
          </div>

          <div className="space-y-3 text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-extrabold">
              <Sparkles className="w-3.5 h-3.5" />
              Final Step 3: Direct Download Gateway
            </div>

            <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Alpha Study Squad APK (Final Step)
            </h1>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Your personal verified installation package is almost ready. Complete the final 3-stage security handshake below to generate your direct download token.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs font-semibold text-slate-500 pt-1">
              <span className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                4.9 / 5 (18,400+ reviews)
              </span>
              <span className="flex items-center gap-1 text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                28.4 MB • Android 7.0+
              </span>
              <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Play Protect Verified Safe
              </span>
            </div>
          </div>
        </header>

        {/* VISUAL 3-STEP PIPELINE WIZARD */}
        <section className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-700">
                Your 3-Step APK Download Roadmap
              </h2>
            </div>
            <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              {stage3Completed ? '100% Completed' : '90% In Final Step'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            {/* Step 1 Visual Card (Completed) */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center">✓</span>
                <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">Step 1 Done</span>
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">Step 1: Device Check</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Device architecture & CPU verified compatible with Alpha Study Squad.
              </p>
            </div>

            {/* Step 2 Visual Card (Completed) */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center">✓</span>
                <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">Step 2 Done</span>
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">Step 2: Study Notes Unpacked</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Extracted topper formulas, question banks & offline sync datasets.
              </p>
            </div>

            {/* Step 3 Visual Card (Active) */}
            <div className="p-4 rounded-2xl bg-emerald-50/80 border-2 border-emerald-400 space-y-2 relative">
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center">3</span>
                <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">Final Step</span>
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">Step 3: Direct Download</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {stage3Completed ? '🎉 Ready! Tap button below to download APK.' : 'Finalizing download token & mirror speed.'}
              </p>
            </div>
          </div>

          {/* Progress bar with percentage */}
          <div className="space-y-1.5 pt-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Overall Download Pipeline</span>
              <span className="text-emerald-600 font-extrabold">
                {stage3Completed ? '100% Ready • Download Unlocked!' : '90% Ready • Final Step'}
              </span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full transition-all duration-700"
                style={{ width: stage3Completed ? '100%' : stage1Completed ? '85%' : '72%' }}
              />
            </div>
          </div>
        </section>

        {/* STEP 1 ENGAGEMENT ACTION CARD (DOES NOT START AUTOMATICALLY) */}
        <section className="bg-white p-6 md:p-8 rounded-3xl border-2 border-emerald-300 shadow-md space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase">
                <Cpu className="w-3.5 h-3.5" /> Stage 3A: Mirror Speed & Bandwidth Allocation
              </div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900">
                Allocate High-Speed Mirror ({STAGE_DURATION}s)
              </h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center font-mono font-black text-xl text-emerald-600 shrink-0">
              {timer1}s
            </div>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed">
            Assigning an optimized regional server mirror to ensure your 28.4 MB APK downloads at full network bandwidth. Click the button below to initiate this 20-second check.
          </p>

          {/* Interactive Trigger Button */}
          <div className="text-center pt-2">
            {!stage1Started ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStage1Started(true)}
                className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base rounded-2xl shadow-xl shadow-emerald-600/30 transition-all cursor-pointer"
              >
                <Cpu className="w-5 h-5" />
                <span>👉 Tap to Allocate Mirror (20s)</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            ) : !stage1Completed ? (
              <div className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-sm font-bold animate-pulse">
                <Clock className="w-4 h-4 animate-spin text-emerald-600" />
                <span>Allocating mirror: Please wait {timer1} seconds...</span>
              </div>
            ) : (
              <motion.button
                initial={{ scale: 0.95 }}
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                onClick={handleScrollToStage2}
                className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-base rounded-2xl shadow-lg shadow-teal-600/30 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>✓ Mirror Assigned (80%) • Scroll Down to Decrypt Key</span>
                <ArrowDown className="w-5 h-5 animate-bounce" />
              </motion.button>
            )}
          </div>
        </section>

        {/* VISUAL HOW TO INSTALL APK INFOGRAPHIC */}
        <article className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <span className="text-xs font-black uppercase text-emerald-600 tracking-wider">Visual Guide</span>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-1">
                How to Install Alpha Study Squad APK on Android
              </h2>
            </div>
            <span className="text-xs font-bold text-slate-500">4 Simple Steps</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-center">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-black text-sm flex items-center justify-center mx-auto">1</div>
              <h4 className="font-bold text-slate-900 text-sm">Download APK</h4>
              <p className="text-xs text-slate-500">Complete verification to download the 28.4 MB file.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-center">
              <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 font-black text-sm flex items-center justify-center mx-auto">2</div>
              <h4 className="font-bold text-slate-900 text-sm">Open File</h4>
              <p className="text-xs text-slate-500">Tap the downloaded notification or look in Downloads.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-center">
              <div className="w-10 h-10 rounded-full bg-cyan-100 text-cyan-700 font-black text-sm flex items-center justify-center mx-auto">3</div>
              <h4 className="font-bold text-slate-900 text-sm">Allow Unknown</h4>
              <p className="text-xs text-slate-500">If asked, toggle &quot;Allow from this source&quot; in Settings.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-center">
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-black text-sm flex items-center justify-center mx-auto">4</div>
              <h4 className="font-bold text-slate-900 text-sm">Install & Launch</h4>
              <p className="text-xs text-slate-500">Tap &apos;Install&apos; and start learning immediately!</p>
            </div>
          </div>
        </article>

        {/* STEP 2 ENGAGEMENT CARD (MIDDLE SCROLL TARGET) */}
        <div ref={section2Ref} className="pt-4">
          <section className="bg-white p-6 md:p-8 rounded-3xl border-2 border-teal-200 shadow-md space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-black uppercase">
                  <Layers className="w-3.5 h-3.5" /> Stage 3B: Decrypt Direct Download Key
                </div>
                <h2 className="text-xl md:text-2xl font-black text-slate-900">
                  Decrypt Download Key ({STAGE_DURATION}s)
                </h2>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center font-mono font-black text-xl text-teal-600 shrink-0">
                {timer2}s
              </div>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed">
              Step 3B authorizes the direct download session and exchanges cryptographic tokens with the verified release repository. Tap below to begin this 20-second step.
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 py-1">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 text-xs font-medium text-slate-700">
                <Check className={`w-4 h-4 ${stage2Completed || timer2 <= 14 ? 'text-emerald-600 font-bold' : 'text-slate-400'}`} />
                <span>SSL Tunnel Secure</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 text-xs font-medium text-slate-700">
                <Check className={`w-4 h-4 ${stage2Completed || timer2 <= 7 ? 'text-emerald-600 font-bold' : 'text-slate-400'}`} />
                <span>Download Nonce Exchanged</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 text-xs font-medium text-slate-700">
                <Check className={`w-4 h-4 ${stage2Completed ? 'text-emerald-600 font-bold' : 'text-slate-400'}`} />
                <span>Token Ready</span>
              </div>
            </div>

            {/* Interactive Trigger Button */}
            <div className="text-center pt-2">
              {!stage1Completed ? (
                <div className="text-xs text-slate-500 font-semibold italic">
                  👉 Please complete the mirror assignment above to unlock this step.
                </div>
              ) : !stage2Started ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStage2Started(true)}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-base rounded-2xl shadow-lg shadow-teal-600/30 transition-all cursor-pointer"
                >
                  <Layers className="w-5 h-5" />
                  <span>👉 Tap to Decrypt Key (20s)</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              ) : !stage2Completed ? (
                <div className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-teal-50 text-teal-800 border border-teal-200 text-sm font-bold animate-pulse">
                  <Clock className="w-4 h-4 animate-spin text-teal-600" />
                  <span>Decrypting download token: Please wait {timer2} seconds...</span>
                </div>
              ) : (
                <motion.button
                  initial={{ scale: 0.95 }}
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  onClick={handleScrollToStage3}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base rounded-2xl shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>✓ Key Decrypted (95%) • Scroll Down to Download APK</span>
                  <ArrowDown className="w-5 h-5 animate-bounce" />
                </motion.button>
              )}
            </div>
          </section>
        </div>

        {/* STEP 3 ENGAGEMENT CARD (FINAL BOTTOM TARGET) */}
        <div ref={section3Ref} className="pt-4">
          <section className="bg-gradient-to-br from-white via-emerald-50/60 to-white p-6 md:p-12 rounded-3xl border-2 border-emerald-400 shadow-xl space-y-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
              <Download className="w-4 h-4" />
              Final Step 3C: Launch Download
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-slate-900">
              {stage3Completed ? '🎉 Alpha Study Squad APK is 100% Ready!' : `Finalizing Download Link (${timer3}s)`}
            </h2>

            <p className="text-slate-600 text-sm max-w-xl mx-auto leading-relaxed">
              {stage3Completed
                ? 'Your device package has been fully prepared and signed. Tap the button below to start your direct download of Alpha Study Squad APK (v3.4.2).'
                : 'Click below to finalize the direct download gateway. Stay on this tab for 20 seconds while the verified link compiles.'}
            </p>

            {/* Interactive Trigger Button */}
            <div className="pt-2">
              {!stage2Completed ? (
                <div className="text-xs text-slate-500 font-semibold italic">
                  👉 Please complete the key decryption above to unlock the final download button.
                </div>
              ) : !stage3Started ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStage3Started(true)}
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg rounded-2xl shadow-xl shadow-emerald-600/30 transition-all cursor-pointer"
                >
                  <Download className="w-6 h-6" />
                  <span>👉 Tap to Finalize APK Download (20s)</span>
                </motion.button>
              ) : !stage3Completed ? (
                <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-slate-100 text-slate-800 border border-slate-300 text-base font-bold animate-pulse">
                  <Clock className="w-5 h-5 animate-spin text-emerald-600" />
                  <span>Finalizing APK Package: {timer3} seconds remaining...</span>
                </div>
              ) : (
                <motion.button
                  initial={{ scale: 0.95 }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  onClick={handleOpenDestination}
                  className="inline-flex items-center justify-center gap-3 px-12 py-6 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 hover:from-emerald-500 hover:to-teal-400 text-white font-black text-xl md:text-2xl rounded-2xl shadow-2xl shadow-emerald-600/40 transition-all cursor-pointer"
                >
                  <Download className="w-7 h-7" />
                  <span>Download Alpha Study Squad APK (v3.4.2) 🚀</span>
                </motion.button>
              )}
            </div>

            <div className="text-xs text-slate-400 font-medium">
              Alpha Study Squad APK • Secure Verified Download • 100% Free Educational Access
            </div>
          </section>
        </div>

      </main>
    </div>
  );
}

export default function SafelinkPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-400">
        <Clock className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    }>
      <SafelinkContent />
    </Suspense>
  );
}
