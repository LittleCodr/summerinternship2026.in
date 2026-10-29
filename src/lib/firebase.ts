import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAa8Gl7R__BOyXr-_zsL6KIQGqHDYrMGNY",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "internshipshub-in.firebaseapp.com",
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || "https://internshipshub-in-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "internshipshub-in",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "internshipshub-in.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "751067799679",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:751067799679:web:0ad14df02b0c9cc6f89f4a",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-1SSVKNL9JS",
};

// Initialize Firebase App safely (singleton)
export const app: FirebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

let analyticsPromise: Promise<Analytics | null> | null = null;

export const getFirebaseAnalytics = (): Promise<Analytics | null> => {
  if (typeof window === "undefined") {
    return Promise.resolve(null);
  }
  if (!analyticsPromise) {
    analyticsPromise = isSupported()
      .then((supported) => {
        if (supported) {
          return getAnalytics(app);
        }
        return null;
      })
      .catch((error) => {
        console.warn("Firebase Analytics is not supported:", error);
        return null;
      });
  }
  return analyticsPromise;
};

export const logFirebaseEvent = async (
  eventName: string,
  eventParams?: Record<string, unknown>
): Promise<void> => {
  if (typeof window === "undefined") return;
  try {
    const analytics = await getFirebaseAnalytics();
    if (analytics) {
      const { logEvent } = await import("firebase/analytics");
      logEvent(analytics, eventName, eventParams);
    }
  } catch (error) {
    console.warn(`Failed to log Firebase event "${eventName}":`, error);
  }
};

export const trackPageView = (pagePath: string, pageTitle?: string): void => {
  logFirebaseEvent("page_view", {
    page_path: pagePath,
    page_location: typeof window !== "undefined" ? window.location.href : "",
    page_title: pageTitle || (typeof document !== "undefined" ? document.title : ""),
  });
};

export const trackApplyClick = (internship: {
  id: string;
  title: string;
  organization?: string;
  applyUrl?: string;
}): void => {
  logFirebaseEvent("apply_click", {
    item_id: internship.id,
    item_name: internship.title,
    organization: internship.organization || "",
    apply_url: internship.applyUrl || "",
  });
};

export const trackSearch = (query: string, resultCount?: number): void => {
  logFirebaseEvent("search", {
    search_term: query,
    result_count: resultCount,
  });
};

export const trackFilterChange = (filter: string): void => {
  logFirebaseEvent("filter_select", {
    filter_value: filter,
  });
};
