"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export default function Privacy() {
  const lastUpdated = "April 19, 2026";
  
  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border border-primary/5 rounded-[48px] p-8 md:p-16 shadow-xl shadow-primary/5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-8">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-primary">Legal</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">Privacy Policy</h1>
          <p className="text-primary/40 mb-12">Last Updated: {lastUpdated}</p>

          <div className="space-y-12 text-primary/70 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">1. Overview</h2>
              <p>
                At SummerInternships.in, your privacy is our priority. This policy outlines how we handle information when you use our discovery platform. We are a signal-first platform and aim to collect as little data as possible to provide a curated experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">2. Information Collection</h2>
              <p>
                We do not require user accounts to browse internship listings. We may collect non-personal information such as:
              </p>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>Search queries for analytical purposes</li>
                <li>Browser type and device information</li>
                <li>Usage patterns to improve our filtering algorithms</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">3. External Links</h2>
              <p>
                Our platform contains links to external official application portals (e.g., IIT/NIT websites or corporate job boards). We are not responsible for the privacy practices or content of these external sites. We encourage you to review their policies before submitting any personal information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">4. Cookies</h2>
              <p>
                We use essential cookies to maintain your session and remember your search preferences. You can disable cookies in your browser settings, though some features like "Recently Viewed" may not function correctly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">5. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at:
                <br />
                <a href="mailto:support@summerinternship2026.in" className="text-primary font-bold underline underline-offset-4">support@summerinternship2026.in</a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
