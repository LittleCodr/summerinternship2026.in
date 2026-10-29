"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getFirebaseAnalytics, trackPageView } from "@/lib/firebase";

function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Warm up Firebase analytics instance on client mount
    getFirebaseAnalytics();
  }, []);

  useEffect(() => {
    if (pathname) {
      const queryString = searchParams?.toString();
      const fullPath = queryString ? `${pathname}?${queryString}` : pathname;
      trackPageView(fullPath);
    }
  }, [pathname, searchParams]);

  return null;
}

export default function FirebaseAnalytics() {
  return (
    <Suspense fallback={null}>
      <AnalyticsTracker />
    </Suspense>
  );
}
