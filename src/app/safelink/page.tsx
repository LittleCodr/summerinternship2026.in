"use client";

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2, ArrowDownCircle, CheckCircle2, Lock, ShieldCheck, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const DOMAINS = ['summerinternship2026.in', 'fellowshiphub.in', 'interniq.org'];
const MAX_HOPS = 3;

function SafelinkContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const hopParam = searchParams.get('hop');
  const currentHop = hopParam ? parseInt(hopParam, 10) : 1;
  
  const [step, setStep] = useState(1); // 1: generate, 2: wait, 3: next
  const [timeLeft, setTimeLeft] = useState(30);
  const [isFetching, setIsFetching] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  
  // Pause timer on tab switch
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (step === 2 && timeLeft > 0) {
      const handleVisibilityChange = () => {
        if (document.hidden) {
          clearInterval(timer);
        } else {
          timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
          }, 1000);
        }
      };
      
      document.addEventListener('visibilitychange', handleVisibilityChange);
      
      if (!document.hidden) {
        timer = setInterval(() => {
          setTimeLeft((prev) => prev - 1);
        }, 1000);
      }
      
      return () => {
        clearInterval(timer);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    } else if (timeLeft <= 0 && step === 2) {
      setStep(3);
    }
  }, [step, timeLeft]);

  const handleGenerateClick = () => {
    setStep(2);
    // Scroll to bottom after a short delay to ensure rendering
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleNextStep = async () => {
    if (!id) return;
    setIsFetching(true);
    
    if (currentHop < MAX_HOPS) {
      // Pick random domain that is not current
      const currentHost = typeof window !== 'undefined' ? window.location.hostname : '';
      const availableDomains = DOMAINS.filter(d => !currentHost.includes(d));
      let nextDomain = availableDomains[Math.floor(Math.random() * availableDomains.length)] || DOMAINS[0];
      
      // Force final hop to a domain with Firebase
      if (currentHop + 1 === MAX_HOPS) {
         nextDomain = 'fellowshiphub.in';
      }
      
      window.location.href = `https://${nextDomain}/safelink?id=${id}&hop=${currentHop + 1}`;
    } else {
      // Fallback: This NextJS app doesn't have Firebase installed.
      // Redirect to one of the Vite apps that does to resolve the final link.
      window.location.href = `https://fellowshiphub.in/safelink?id=${id}&hop=${MAX_HOPS}`;
    }
  };

  if (!id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-slate-100 max-w-md">
          <Lock className="w-12 h-12 text-rose-500 mx-auto mb-4" />
          <h1 className="text-2xl font-black text-slate-900 mb-2">Invalid Link</h1>
          <p className="text-slate-500">The link you followed is broken or missing required parameters.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pt-8 pb-20 px-4 md:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Article Header */}
        <div className="p-8 md:p-12 border-b border-slate-100 bg-slate-900 text-white text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold mb-6">
            <ShieldCheck className="w-4 h-4" />
            Secure Verification System
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
            Preparing Your Secure Link
          </h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto">
            Please follow the steps below to verify your session and access the requested resource securely.
          </p>
        </div>

        {/* Article Body Content */}
        <div className="p-8 md:p-12 space-y-8 text-slate-600 text-lg leading-relaxed">
          <h2 className="text-2xl font-bold text-slate-900">Why are we doing this?</h2>
          <p>
            To protect our resources from bots, scrapers, and malicious activity, we require a brief verification process. This ensures that the destination link remains active and accessible to real users like you.
          </p>
          
          <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
            <h3 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Important Instructions
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-amber-800/80 text-base">
              <li>Click the verification button below.</li>
              <li>Wait for the countdown timer to finish at the bottom of the page.</li>
              <li>Do not close or switch the tab, or the timer will pause automatically.</li>
              <li>Once completed, proceed to the next step.</li>
            </ul>
          </div>

          <p>
            We appreciate your patience. Our community relies on these security measures to continue providing high-quality, free resources without disruption.
          </p>

          {/* Action 1: Generate Button */}
          <div className="py-8 text-center border-t border-b border-slate-100 my-10">
            {step === 1 ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerateClick}
                className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/20 transition-all text-lg w-full md:w-auto justify-center"
              >
                Click Here to Verify & Generate Link
                <ArrowDownCircle className="w-6 h-6 animate-bounce" />
              </motion.button>
            ) : (
              <div className="inline-flex items-center gap-2 text-emerald-600 font-bold bg-emerald-50 px-6 py-3 rounded-xl border border-emerald-100">
                <CheckCircle2 className="w-5 h-5" />
                Verification Started! Please scroll down.
              </div>
            )}
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">What happens next?</h2>
            <p>
              Depending on the security protocol for this specific resource, you may be required to complete 1 to 3 quick verification hops. This distributed network approach allows us to keep our server costs manageable while preventing automated abuse.
            </p>
            <p>
              Once all hops are completed, you will be redirected automatically to your final destination URL. No further action will be required on your part.
            </p>
            <div className="h-40 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 font-medium">
              Advertisement Space (Optional)
            </div>
            <p>
              If you encounter any issues during this process, please ensure you do not have any strict ad-blockers preventing the countdown scripts from executing, and try refreshing the page.
            </p>
          </div>
        </div>

        {/* Action 2: Timer & Next Step */}
        <div ref={bottomRef} className="p-8 md:p-12 bg-slate-50 border-t border-slate-200 text-center">
          {step === 1 ? (
            <div className="text-slate-400 font-medium py-8">
              Please click the generate button above to start the timer.
            </div>
          ) : step === 2 ? (
            <div className="py-6">
              <div className="text-5xl font-black text-slate-900 mb-4 tabular-nums tracking-tighter">
                {timeLeft}s
              </div>
              <p className="text-slate-500 font-medium mb-6">
                Please wait while we prepare your link...
              </p>
              
              {/* Progress bar */}
              <div className="w-full max-w-md mx-auto h-3 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all duration-1000 ease-linear"
                  style={{ width: `${((30 - timeLeft) / 30) * 100}%` }}
                />
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-6"
            >
              <button
                onClick={handleNextStep}
                disabled={isFetching}
                className="inline-flex items-center gap-3 px-10 py-5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-70 text-white rounded-2xl font-black shadow-xl shadow-emerald-500/20 transition-all text-xl w-full md:w-auto justify-center"
              >
                {isFetching ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    {currentHop < MAX_HOPS ? 'Go to Next Step' : 'Get Destination Link'}
                  </>
                )}
              </button>
              <p className="mt-4 text-slate-500 text-sm font-medium">
                Step {currentHop} of {MAX_HOPS} completed
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SafelinkPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    }>
      <SafelinkContent />
    </Suspense>
  );
}
