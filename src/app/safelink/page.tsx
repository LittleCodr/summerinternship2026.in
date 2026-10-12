"use client";

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowDown,
  ExternalLink,
  AlertCircle,
  Sparkles,
  BookOpen,
  Award,
  ChevronDown,
  ChevronUp,
  FileCheck,
  Zap,
  Globe2,
  Building2,
  Briefcase,
  Star,
  CheckCheck
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

  // If ID provided, try fetching from Firestore REST API (no firebase package needed!)
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
          // fallback to fellowship-in if different project
          fetch(`https://firestore.googleapis.com/v1/projects/fellowship-in/databases/(default)/documents/safelinks/${id}`)
            .then((res) => res.json())
            .then((data) => {
              if (data?.fields?.targetUrl?.stringValue) {
                setDestinationUrl(data.fields.targetUrl.stringValue);
              }
            })
            .catch(() => {
              // Keep default
            });
        });
    }
  }, [id]);

  // 3 Distinct Psychological Stages (each 20 seconds, total 60s minimum dwell)
  const [stage, setStage] = useState<1 | 2 | 3>(1);
  const [timer1, setTimer1] = useState(STAGE_DURATION);
  const [timer2, setTimer2] = useState(STAGE_DURATION);
  const [timer3, setTimer3] = useState(STAGE_DURATION);
  const [stage1Unlocked, setStage1Unlocked] = useState(false);
  const [stage2Unlocked, setStage2Unlocked] = useState(false);
  const [stage3Unlocked, setStage3Unlocked] = useState(false);
  const [isTabHidden, setIsTabHidden] = useState(false);

  // FAQ Accordion states
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Refs for smooth scroll
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);

  // Tab visibility detection to pause timers
  useEffect(() => {
    const handleVisibility = () => {
      setIsTabHidden(document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Stage 1 Countdown (20 seconds)
  useEffect(() => {
    if (stage === 1 && !stage1Unlocked) {
      if (isTabHidden) return;
      const interval = setInterval(() => {
        setTimer1((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setStage1Unlocked(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [stage, stage1Unlocked, isTabHidden]);

  // Stage 2 Countdown (20 seconds)
  useEffect(() => {
    if (stage === 2 && !stage2Unlocked) {
      if (isTabHidden) return;
      const interval = setInterval(() => {
        setTimer2((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setStage2Unlocked(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [stage, stage2Unlocked, isTabHidden]);

  // Stage 3 Countdown (20 seconds)
  useEffect(() => {
    if (stage === 3 && !stage3Unlocked) {
      if (isTabHidden) return;
      const interval = setInterval(() => {
        setTimer3((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setStage3Unlocked(true);
            try {
              confetti({ particleCount: 70, spread: 80, origin: { y: 0.7 } });
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
  }, [stage, stage3Unlocked, isTabHidden]);

  const handleStage1Complete = () => {
    setStage(2);
    setTimeout(() => {
      section2Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleStage2Complete = () => {
    setStage(3);
    setTimeout(() => {
      section3Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  const currentSeconds = stage === 1 ? timer1 : stage === 2 ? timer2 : timer3;
  const currentProgress = ((STAGE_DURATION - currentSeconds) / STAGE_DURATION) * 100;
  const totalDwellCompleted = (STAGE_DURATION - timer1) + (STAGE_DURATION - timer2) + (STAGE_DURATION - timer3);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
      {/* TOP FLOATING VERIFICATION BAR */}
      <div className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-xl px-4 py-3">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-bold text-emerald-400">
                  Final Hop 3/3 (SummerInternship2026.in)
                </span>
                <span className="px-2 py-0.5 text-[10px] rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  Total Dwell: {totalDwellCompleted}s / 60s
                </span>
              </div>
              <div className="text-xs text-slate-400 font-medium">
                {stage === 1 && !stage1Unlocked && 'Step 1/3: Reading Verification — Active'}
                {stage === 1 && stage1Unlocked && '✓ Step 1 Cleared — Scroll to Step 2'}
                {stage === 2 && !stage2Unlocked && 'Step 2/3: Bot Filter & Security Handshake'}
                {stage === 2 && stage2Unlocked && '✓ Step 2 Cleared — Scroll to Step 3'}
                {stage === 3 && !stage3Unlocked && 'Step 3/3: Final Link Decryption in progress'}
                {stage === 3 && stage3Unlocked && '✓ Verification Complete — Destination Ready!'}
              </div>
            </div>
          </div>

          {/* Psychological 20s Animated Timer */}
          <div className="flex items-center gap-4">
            {isTabHidden ? (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold animate-pulse">
                <AlertCircle className="w-4 h-4" />
                <span>Timer Paused (Keep tab open)</span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-[11px] text-slate-400 uppercase font-semibold">Stage Timer</div>
                  <div className="text-xl font-black font-mono tracking-tight text-white flex items-center gap-1">
                    <Clock className="w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: '4s' }} />
                    {currentSeconds}s
                  </div>
                </div>
                {/* 20s progress mini ring */}
                <div className="w-10 h-10 relative flex items-center justify-center">
                  <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-800"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-emerald-500 transition-all duration-1000 ease-linear"
                      strokeDasharray={`${currentProgress}, 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="absolute text-[10px] font-bold text-emerald-300">{currentSeconds}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-10">
        
        {/* ARTICLE HEADER HERO */}
        <header className="space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              Final Verification Portal
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300">
              <BookOpen className="w-3.5 h-3.5" /> 6 min comprehensive read
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <CheckCheck className="w-3.5 h-3.5" /> Destination Unlocking Stage
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
            Official Summer Internship 2026 Resource Hub: Tier-1 Openings & Access Gateway
          </h1>

          <p className="text-lg text-slate-300 leading-relaxed max-w-3xl">
            Welcome to the final gateway. Review verified corporate listings, research grants, and direct opening links across global tech leaders. Complete the 3-step verification below to reveal your requested link.
          </p>

          <div className="flex items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-900">
            <span>By SummerInternship2026 Opportunity Directorate</span>
            <span>•</span>
            <span>Final Node: summerinternship2026.in</span>
          </div>
        </header>

        {/* STAGE 1 ACTION CARD */}
        <section className="bg-gradient-to-br from-slate-900 via-emerald-950/40 to-slate-900 p-6 md:p-8 rounded-3xl border border-emerald-500/30 shadow-2xl space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-400 flex items-center gap-1.5 mb-1">
                <FileCheck className="w-4 h-4" />
                Stage 1 of 3: Content Verification
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Preparing Final Gateway Link ({STAGE_DURATION}s Reading Timer)
              </h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center font-mono font-black text-xl text-emerald-400">
              {timer1}s
            </div>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed">
            Please browse the opportunities below while your final session handshake executes. Do not switch tabs or minimize the browser window.
          </p>

          {/* Progress bar */}
          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-1000 ease-linear rounded-full"
              style={{ width: `${((STAGE_DURATION - timer1) / STAGE_DURATION) * 100}%` }}
            />
          </div>

          {/* Stage 1 Unlock Button */}
          <div className="pt-2 text-center">
            {stage === 1 && !stage1Unlocked ? (
              <div className="inline-flex items-center gap-2 text-slate-400 bg-slate-800/80 px-5 py-3 rounded-xl border border-slate-700 text-sm font-medium">
                <Clock className="w-4 h-4 animate-spin text-emerald-400" />
                <span>Reading timer active: Please wait {timer1} seconds...</span>
              </div>
            ) : stage === 1 && stage1Unlocked ? (
              <motion.button
                initial={{ scale: 0.95 }}
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                onClick={handleStage1Complete}
                className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-extrabold text-base rounded-2xl shadow-xl shadow-emerald-600/30 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                <span>Step 1 Verified! Click to Scroll & Proceed to Step 2</span>
                <ArrowDown className="w-5 h-5 animate-bounce" />
              </motion.button>
            ) : (
              <div className="inline-flex items-center gap-2 text-emerald-400 bg-emerald-950/40 px-4 py-2 rounded-xl border border-emerald-500/30 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Step 1 Cleared (20s completed)</span>
              </div>
            )}
          </div>
        </section>

        {/* EDITORIAL CONTENT SECTION 1: RESEARCH & INDUSTRY OPPORTUNITIES */}
        <article className="space-y-6 text-slate-300 leading-relaxed">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Star className="w-6 h-6 text-emerald-400" />
            1. Prestigious Research & Academic Internships (Summer 2026)
          </h2>
          <p>
            If your goal is higher studies, research publications, or working alongside world-class professors, these sponsored research internships provide full funding, flights, and stipends:
          </p>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-800/80 text-xs uppercase font-bold text-slate-300 border-b border-slate-700">
                <tr>
                  <th className="p-4">Program Name</th>
                  <th className="p-4">Hosting Institution</th>
                  <th className="p-4">Stipend & Perks</th>
                  <th className="p-4">Eligibility</th>
                  <th className="p-4">Application Deadline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-bold text-white flex items-center gap-2">
                    <Globe2 className="w-4 h-4 text-emerald-400" />
                    MITACS Globalink
                  </td>
                  <td className="p-4">Top Canadian Universities</td>
                  <td className="p-4 text-emerald-400 font-bold">$12,000 CAD (Flight + Housing + Stipend)</td>
                  <td className="p-4">Pre-Final Year B.Tech / M.Tech</td>
                  <td className="p-4">September - October</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-bold text-white flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-emerald-400" />
                    IIT Kanpur SURGE
                  </td>
                  <td className="p-4">IIT Kanpur Labs</td>
                  <td className="p-4 text-emerald-400 font-bold">₹12,500 / mo + Campus Stay</td>
                  <td className="p-4">2nd & 3rd Year Undergrads</td>
                  <td className="p-4">January - February</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-bold text-white flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-400" />
                    TIFR VSRP Program
                  </td>
                  <td className="p-4">Tata Institute of Fundamental Research</td>
                  <td className="p-4 text-emerald-400 font-bold">₹10,000 / mo + Travel allowance</td>
                  <td className="p-4">Science & Engineering Students</td>
                  <td className="p-4">December - January</td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>

        {/* STAGE 2 ACTION CARD (SCROLL TARGET) */}
        <div ref={section2Ref} className="pt-6">
          <section className="bg-gradient-to-br from-slate-900 via-teal-950/30 to-slate-900 p-6 md:p-8 rounded-3xl border border-teal-500/30 shadow-2xl space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-wider text-teal-400 flex items-center gap-1.5 mb-1">
                  <Zap className="w-4 h-4" />
                  Stage 2 of 3: Bot Filter & Security Handshake
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  Decrypting Secure Target ({STAGE_DURATION}s Analysis)
                </h2>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-teal-600/20 border border-teal-500/40 flex items-center justify-center font-mono font-black text-xl text-teal-400">
                {timer2}s
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              Verifying 3-hop transit authentication trail. Read through our behavioral interview tips below while the link is decrypted.
            </p>

            {/* Checklist items */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 py-2">
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className={`w-4 h-4 ${stage2Unlocked || timer2 <= 14 ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span>FellowshipHub Verified</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className={`w-4 h-4 ${stage2Unlocked || timer2 <= 7 ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span>InternIQ Verified</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className={`w-4 h-4 ${stage2Unlocked ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span>Target Decrypted</span>
              </div>
            </div>

            {/* Stage 2 Progress Bar */}
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-1000 ease-linear rounded-full"
                style={{ width: `${((STAGE_DURATION - timer2) / STAGE_DURATION) * 100}%` }}
              />
            </div>

            {/* Stage 2 Unlock Button */}
            <div className="pt-2 text-center">
              {stage < 2 ? (
                <div className="text-slate-500 text-xs italic">
                  Complete Stage 1 above to unlock this security scan.
                </div>
              ) : stage === 2 && !stage2Unlocked ? (
                <div className="inline-flex items-center gap-2 text-slate-400 bg-slate-800/80 px-5 py-3 rounded-xl border border-slate-700 text-sm font-medium">
                  <Clock className="w-4 h-4 animate-spin text-teal-400" />
                  <span>Scanning session: Please wait {timer2} seconds...</span>
                </div>
              ) : stage === 2 && stage2Unlocked ? (
                <motion.button
                  initial={{ scale: 0.95 }}
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  onClick={handleStage2Complete}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-500 hover:to-emerald-400 text-white font-extrabold text-base rounded-2xl shadow-xl shadow-teal-600/30 transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                  <span>Step 2 Verified! Click to Scroll to Destination Button</span>
                  <ArrowDown className="w-5 h-5 animate-bounce" />
                </motion.button>
              ) : (
                <div className="inline-flex items-center gap-2 text-emerald-400 bg-emerald-950/40 px-4 py-2 rounded-xl border border-emerald-500/30 text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Step 2 Cleared (40s cumulative completed)</span>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* EDITORIAL CONTENT SECTION 2: INTERVIEW STRATEGY */}
        <article className="space-y-6 text-slate-300 leading-relaxed">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-teal-400" />
            2. Clearing the Behavioral & Technical Interview Round
          </h2>
          <p>
            Technical skill qualifies you for the interview, but behavioral alignment gets you the offer. Frame every response using the STAR technique (Situation, Task, Action, Result) with quantitative outcomes:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">Technical Depth</div>
              <h3 className="text-base font-bold text-white">Explain Architecture Choices</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Don&apos;t just describe code syntax. Explain why you chose Redis over Memcached, or PostgreSQL over MongoDB, and the engineering trade-offs involved.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-teal-400">Conflict Resolution</div>
              <h3 className="text-base font-bold text-white">Demonstrate Humility</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                When asked about project disputes, highlight how you used data, peer reviews, and user requirements rather than personal bias to resolve disagreements.
              </p>
            </div>
          </div>

          {/* Interactive FAQs */}
          <div className="space-y-3 pt-4">
            <h3 className="text-lg font-bold text-white">Frequently Asked Questions</h3>
            {[
              {
                q: 'What should I do if I miss the application deadline?',
                a: 'Reach out to hiring managers directly on LinkedIn with a demo of an open-source project relevant to their team. Often managers have discretionary headcount even after official portal closures.'
              },
              {
                q: 'Are research internships evaluated similarly to corporate roles?',
                a: 'Research roles prioritize mathematical rigor, ability to read academic papers, and prototype code, whereas corporate roles prioritize production engineering, tests, and clean architecture.'
              }
            ].map((faq, i) => (
              <div key={i} className="border border-slate-800 rounded-xl bg-slate-900/70 overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full p-4 flex items-center justify-between text-left text-sm font-semibold text-slate-200 hover:text-white"
                >
                  <span>{faq.q}</span>
                  {expandedFaq === i ? <ChevronUp className="w-4 h-4 text-emerald-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                <AnimatePresence>
                  {expandedFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-4 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </article>

        {/* STAGE 3 FINAL ACTION CARD (BOTTOM TARGET) */}
        <div ref={section3Ref} className="pt-6">
          <section className="bg-gradient-to-br from-slate-900 via-emerald-950/60 to-slate-900 p-6 md:p-12 rounded-3xl border border-emerald-500/40 shadow-2xl space-y-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
              <ShieldCheck className="w-4 h-4" />
              Final Step 3 of 3: Verification Complete!
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-white">
              {stage3Unlocked ? '🎉 Your Destination Link is Ready!' : `Finalizing Gateway Access (${timer3}s Countdown)`}
            </h2>

            <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
              {stage3Unlocked
                ? 'All 3 security verification hops have been completed successfully (180s total verified dwell time across network). Click below to open your requested destination resource.'
                : 'Allocating dedicated bandwidth tunnel. Keep this tab active while the countdown completes.'}
            </p>

            {/* Stage 3 Progress Bar */}
            <div className="w-full max-w-md mx-auto h-3 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-1000 ease-linear rounded-full"
                style={{ width: `${((STAGE_DURATION - timer3) / STAGE_DURATION) * 100}%` }}
              />
            </div>

            {/* Action / Destination Button */}
            <div className="pt-4">
              {stage < 3 ? (
                <div className="text-slate-500 text-sm font-medium">
                  Please complete Stage 1 & Stage 2 above to unlock the destination button.
                </div>
              ) : !stage3Unlocked ? (
                <div className="inline-flex items-center gap-3 px-8 py-5 rounded-2xl bg-slate-800 text-slate-400 border border-slate-700 text-base font-semibold">
                  <Clock className="w-5 h-5 animate-spin text-emerald-400" />
                  <span>Unlocking Link: {timer3} seconds remaining...</span>
                </div>
              ) : (
                <motion.button
                  initial={{ scale: 0.95 }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  onClick={handleOpenDestination}
                  className="inline-flex items-center justify-center gap-3 px-12 py-6 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xl md:text-2xl rounded-2xl shadow-2xl shadow-emerald-500/40 transition-all cursor-pointer"
                >
                  <span>Access Destination (videynow.com)</span>
                  <ExternalLink className="w-7 h-7" />
                </motion.button>
              )}
            </div>

            <div className="text-xs text-slate-500 font-medium pt-2">
              Hop Sequence: <span className="text-slate-400">1. FellowshipHub</span> ➔ <span className="text-slate-400">2. InternIQ</span> ➔ <span className="text-emerald-400 font-bold">3. SummerInternship2026 (Unlocked)</span>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
}

export default function SafelinkPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400">
        <Clock className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    }>
      <SafelinkContent />
    </Suspense>
  );
}
