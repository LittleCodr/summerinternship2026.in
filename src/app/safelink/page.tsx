"use client";

import React, { useState, useEffect, Suspense } from 'react';
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
  ArrowRight,
  AlertCircle,
  FileText,
  Check,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const STAGE_DURATION = 20; // 20s simple timer per phase = 60s total dwell time
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

  // Easy 3-phase controller in one clear Action Box
  // Part 1: Connect Fast Server (20s)
  // Part 2: Prepare Download Link (20s)
  // Part 3: Unlock Download (20s)
  // Total = 60 seconds dwell time
  const [currentPhase, setCurrentPhase] = useState<1 | 2 | 3>(1);
  const [phaseStatus, setPhaseStatus] = useState<'IDLE' | 'RUNNING' | 'DONE'>('IDLE');
  const [secondsLeft, setSecondsLeft] = useState(STAGE_DURATION);
  const [isTabHidden, setIsTabHidden] = useState(false);

  // FAQ Accordion state
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Pause timer if user switches tab
  useEffect(() => {
    const handleVisibility = () => {
      setIsTabHidden(document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Timer Countdown
  useEffect(() => {
    if (phaseStatus === 'RUNNING') {
      if (isTabHidden) return;
      const interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setPhaseStatus('DONE');
            if (currentPhase === 3) {
              try {
                confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
              } catch {
                // ignore
              }
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [phaseStatus, isTabHidden, currentPhase]);

  // Start current phase timer
  const handleStartTimer = () => {
    setSecondsLeft(STAGE_DURATION);
    setPhaseStatus('RUNNING');
  };

  // Move from Phase 1 -> Phase 2
  const handleProceedToPhase2 = () => {
    setCurrentPhase(2);
    setSecondsLeft(STAGE_DURATION);
    setPhaseStatus('RUNNING');
  };

  // Move from Phase 2 -> Phase 3
  const handleProceedToPhase3 = () => {
    setCurrentPhase(3);
    setSecondsLeft(STAGE_DURATION);
    setPhaseStatus('RUNNING');
  };

  // Final Action: Unlock and Download App!
  const handleOpenDestination = () => {
    try {
      confetti({ particleCount: 100, spread: 90, origin: { y: 0.6 } });
    } catch {
      // ignore
    }
    window.location.href = destinationUrl;
  };

  const phaseProgressPercent = ((STAGE_DURATION - secondsLeft) / STAGE_DURATION) * 100;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-emerald-600 selection:text-white">
      {/* TOP NOTIFICATION HEADER */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm px-4 py-3">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 font-black text-xl">
              α
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-600">
                  Step 3 of 3: Download App
                </span>
                <span className="px-2 py-0.5 text-[10px] rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                  {currentPhase === 3 && phaseStatus === 'DONE' ? '100% Ready • Download Now!' : '90% Ready • Almost There!'}
                </span>
              </div>
              <div className="text-xs text-slate-500 font-medium">
                Alpha Study Squad APK • Free Student Download
              </div>
            </div>
          </div>

          {/* Active Timer Pill / Pause Notification */}
          <div className="flex items-center gap-3">
            {isTabHidden ? (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-800 text-xs font-bold animate-pulse">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>Timer Paused: Please stay on this page</span>
              </div>
            ) : phaseStatus === 'RUNNING' ? (
              <div className="flex items-center gap-2.5 bg-slate-100 px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-inner">
                <div className="text-right">
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Please Wait</div>
                  <div className="text-base font-black font-mono text-slate-900 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-600 animate-spin" style={{ animationDuration: '3s' }} />
                    {secondsLeft}s
                  </div>
                </div>
                {/* 20s progress bar */}
                <div className="w-12 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 transition-all duration-1000 ease-linear rounded-full"
                    style={{ width: `${phaseProgressPercent}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-slate-700 font-semibold bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Ready to Download</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* BREADCRUMB */}
      <div className="bg-slate-100 border-b border-slate-200 py-2 px-4">
        <div className="max-w-4xl mx-auto text-xs font-medium text-slate-500 flex items-center gap-2">
          <a href="/" className="hover:text-emerald-600 transition-colors">Home</a>
          <span className="text-slate-400">/</span>
          <span className="text-slate-600">Free Student Apps</span>
          <span className="text-slate-400">/</span>
          <span className="text-slate-900 font-semibold truncate">Alpha Study Squad APK • Final Step</span>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-10 space-y-8">

        {/* ============================================================== */}
        {/* ⭐ THE PROMINENT EASY ACTION BOX: TELLS WHAT AND WHEN TO DO ⭐ */}
        {/* ============================================================== */}
        <section className="bg-white rounded-3xl p-6 md:p-8 border-2 border-emerald-300 shadow-xl space-y-6">
          
          {/* Box Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/30 text-2xl font-black">
                α
              </div>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600">
                  Easy Download Assistant • Final Step
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                  {currentPhase === 3 && phaseStatus === 'DONE' ? 'App Ready to Download!' : 'Preparing Direct Download Link'}
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              <Smartphone className="w-4 h-4 text-emerald-600" />
              <span>28 MB • Free for Android</span>
            </div>
          </div>

          {/* 3 Step Visual Sequence */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-xs font-bold">
            <div className={`p-2.5 rounded-xl border transition-all ${
              currentPhase === 1
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-sm'
                : currentPhase > 1
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-slate-50 border-slate-200 text-slate-500'
            }`}>
              <div className="font-extrabold mb-0.5">
                {currentPhase > 1 ? '✅ Part 1 Done' : 'Part 1 of 3'}
              </div>
              <div className="text-[11px] font-medium">1. Fast Server (20s)</div>
            </div>

            <div className={`p-2.5 rounded-xl border transition-all ${
              currentPhase === 2
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-sm'
                : currentPhase > 2
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-slate-50 border-slate-200 text-slate-500'
            }`}>
              <div className="font-extrabold mb-0.5">
                {currentPhase > 2 ? '✅ Part 2 Done' : 'Part 2 of 3'}
              </div>
              <div className="text-[11px] font-medium">2. Prepare Link (20s)</div>
            </div>

            <div className={`p-2.5 rounded-xl border transition-all ${
              currentPhase === 3
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-sm'
                : 'bg-slate-50 border-slate-200 text-slate-500'
            }`}>
              <div className="font-extrabold mb-0.5">
                {currentPhase === 3 && phaseStatus === 'DONE' ? '✅ Part 3 Done' : 'Part 3 of 3'}
              </div>
              <div className="text-[11px] font-medium">3. Unlock File (20s)</div>
            </div>
          </div>

          {/* WHAT & WHEN DUAL GUIDANCE CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* CARD 1: WHAT TO DO */}
            <div className={`p-4 rounded-2xl border-2 transition-all flex items-start gap-3 ${
              phaseStatus === 'RUNNING'
                ? 'bg-amber-50/80 border-amber-300 text-amber-950'
                : phaseStatus === 'DONE'
                ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                : 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
            }`}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-base shrink-0 shadow-sm ${
                phaseStatus === 'RUNNING'
                  ? 'bg-amber-500 text-white'
                  : 'bg-emerald-600 text-white'
              }`}>
                {phaseStatus === 'RUNNING' ? '⏳' : phaseStatus === 'DONE' ? '✅' : '👉'}
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] font-black uppercase tracking-wider opacity-75">
                  1. What to do
                </span>
                <p className="text-sm sm:text-base font-extrabold leading-tight">
                  {currentPhase === 1 && phaseStatus === 'IDLE' && 'Tap the green button below to connect to server.'}
                  {currentPhase === 1 && phaseStatus === 'RUNNING' && 'Keep this screen open while server connects.'}
                  {currentPhase === 1 && phaseStatus === 'DONE' && 'Tap the green button to start Part 2 (Prepare Link).'}

                  {currentPhase === 2 && phaseStatus === 'RUNNING' && 'Keep this screen open while download link prepares.'}
                  {currentPhase === 2 && phaseStatus === 'DONE' && 'Tap the green button to start Part 3 (Unlock File).'}

                  {currentPhase === 3 && phaseStatus === 'RUNNING' && 'Almost done! Keep screen open for last few seconds.'}
                  {currentPhase === 3 && phaseStatus === 'DONE' && '🎉 All done! Tap the big green button below to download the app!'}
                </p>
              </div>
            </div>

            {/* CARD 2: WHEN TO DO IT */}
            <div className={`p-4 rounded-2xl border-2 transition-all flex items-start gap-3 ${
              phaseStatus === 'RUNNING'
                ? 'bg-amber-50/80 border-amber-300 text-amber-950'
                : phaseStatus === 'DONE'
                ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                : 'bg-blue-50/80 border-blue-300 text-blue-950'
            }`}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-base shrink-0 shadow-sm ${
                phaseStatus === 'RUNNING'
                  ? 'bg-amber-500 text-white'
                  : phaseStatus === 'DONE'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-blue-600 text-white'
              }`}>
                <Clock className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] font-black uppercase tracking-wider opacity-75">
                  2. When to do it
                </span>
                <p className="text-sm sm:text-base font-extrabold leading-tight">
                  {phaseStatus === 'IDLE' && 'Right now! Whenever you are ready.'}
                  {phaseStatus === 'RUNNING' && `Wait ${secondsLeft} seconds until countdown reaches 0s.`}
                  {phaseStatus === 'DONE' && 'Right now! Your download link is ready.'}
                </p>
              </div>
            </div>
          </div>

          {/* BIG INTERACTIVE ACTION BUTTON */}
          <div className="text-center pt-2">
            {/* Phase 1: Not started yet */}
            {currentPhase === 1 && phaseStatus === 'IDLE' && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStartTimer}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg rounded-2xl shadow-xl shadow-emerald-600/30 transition-all cursor-pointer"
              >
                <Smartphone className="w-6 h-6" />
                <span>👉 TAP HERE TO START FINAL STEP (Part 1 - 20s)</span>
                <ArrowRight className="w-6 h-6" />
              </motion.button>
            )}

            {/* When Running (Any Phase) */}
            {phaseStatus === 'RUNNING' && (
              <div className="inline-flex items-center gap-3 px-8 py-4.5 rounded-2xl bg-slate-100 text-slate-800 border-2 border-slate-300 text-base font-extrabold shadow-inner">
                <Clock className="w-5 h-5 animate-spin text-emerald-600" />
                <span>Please wait {secondsLeft} seconds... (Keep tab open)</span>
              </div>
            )}

            {/* Phase 1 Finished -> Proceed to Phase 2 */}
            {currentPhase === 1 && phaseStatus === 'DONE' && (
              <motion.button
                initial={{ scale: 0.95 }}
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ repeat: Infinity, duration: 1.8 }}
                onClick={handleProceedToPhase2}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg rounded-2xl shadow-xl shadow-emerald-600/30 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-6 h-6" />
                <span>👉 TAP HERE TO PREPARE APP FILE (Part 2)</span>
                <ArrowRight className="w-6 h-6" />
              </motion.button>
            )}

            {/* Phase 2 Finished -> Proceed to Phase 3 */}
            {currentPhase === 2 && phaseStatus === 'DONE' && (
              <motion.button
                initial={{ scale: 0.95 }}
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ repeat: Infinity, duration: 1.8 }}
                onClick={handleProceedToPhase3}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg rounded-2xl shadow-xl shadow-emerald-600/30 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-6 h-6" />
                <span>👉 TAP HERE TO UNLOCK DOWNLOAD (Part 3)</span>
                <ArrowRight className="w-6 h-6" />
              </motion.button>
            )}

            {/* Phase 3 Finished -> THE FINAL UNLOCKED DOWNLOAD BUTTON! */}
            {currentPhase === 3 && phaseStatus === 'DONE' && (
              <div className="space-y-4">
                <motion.button
                  initial={{ scale: 0.95 }}
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  onClick={handleOpenDestination}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-black text-lg sm:text-xl rounded-2xl shadow-2xl shadow-emerald-600/40 transition-all cursor-pointer"
                >
                  <Download className="w-7 h-7" />
                  <span>📥 DOWNLOAD ALPHA STUDY SQUAD APK (28 MB) NOW 🚀</span>
                </motion.button>
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs font-bold text-emerald-800 max-w-md mx-auto">
                  ✅ What to do next: Tap &apos;Download Anyway&apos; or &apos;Install&apos; on your phone when prompted to begin studying!
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-500 pt-1 border-t border-slate-100">
            <span className="flex items-center gap-1 text-emerald-600">
              <ShieldCheck className="w-4 h-4" /> 100% Free & Safe
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-amber-500">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> 4.9 / 5 Rating (18,400+ Students)
            </span>
            <span>•</span>
            <span>Works on All Android Phones</span>
          </div>
        </section>

        {/* ============================================================== */}
        {/* RICH ARTICLE SECTION: WHAT YOU GET IN THE APP */}
        {/* ============================================================== */}
        <article className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-black uppercase text-emerald-600 tracking-wider">Free Study Content</span>
              <h2 className="text-2xl font-black text-slate-900 mt-1">
                Everything Included in Alpha Study Squad App
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200">
              100% Free Student Portal
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Topper Handwritten Notes</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Clear PDF notes written by top rankers for college subjects, competitive exams, and interview prep.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Scholarship & Exam Alerts</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Daily reminders for government scholarships, PMRF (₹80,000/mo), and paid internship deadlines so you never miss out.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-teal-100 flex items-center justify-center text-teal-600 font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Practice Questions & Answers</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Over 15,000+ chapter-wise practice questions with simple explanations. Works completely without internet!
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">No Distractions & No Ads</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Clean and peaceful study space. Zero annoying popups so you can focus completely on your learning.
              </p>
            </div>
          </div>
        </article>

        {/* ============================================================== */}
        {/* HOW TO INSTALL (SIMPLE 4-STEP VISUAL INFOGRAPHIC) */}
        {/* ============================================================== */}
        <section className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <span className="text-xs font-black uppercase text-emerald-600 tracking-wider">Installation Guide</span>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-1">
                How to Install on Your Android Phone
              </h2>
            </div>
            <span className="text-xs font-bold text-slate-500">Takes 1 Minute</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-center">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-black text-sm flex items-center justify-center mx-auto">1</div>
              <h4 className="font-bold text-slate-900 text-sm">Download App</h4>
              <p className="text-xs text-slate-500">Finish the quick steps to get the 28 MB app file.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-center">
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-black text-sm flex items-center justify-center mx-auto">2</div>
              <h4 className="font-bold text-slate-900 text-sm">Open File</h4>
              <p className="text-xs text-slate-500">Tap on the downloaded file in your notifications.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-center">
              <div className="w-10 h-10 rounded-full bg-cyan-100 text-cyan-700 font-black text-sm flex items-center justify-center mx-auto">3</div>
              <h4 className="font-bold text-slate-900 text-sm">Tap Install</h4>
              <p className="text-xs text-slate-500">If your phone asks, tap &apos;Allow install&apos; in Settings.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-center">
              <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 font-black text-sm flex items-center justify-center mx-auto">4</div>
              <h4 className="font-bold text-slate-900 text-sm">Open & Learn!</h4>
              <p className="text-xs text-slate-500">Launch the app and start reading all topper notes!</p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

export default function SafelinkPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4" />
          <h2 className="text-lg font-black text-slate-800">Loading Alpha Study Squad App Assistant...</h2>
          <p className="text-xs text-slate-500 mt-1">Please wait a moment</p>
        </div>
      }
    >
      <SafelinkContent />
    </Suspense>
  );
}
