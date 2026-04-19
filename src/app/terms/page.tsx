"use client";

import { motion } from "framer-motion";
import { Scale } from "lucide-react";

export default function Terms() {
  const lastUpdated = "April 19, 2026";
  
  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border border-primary/5 rounded-[48px] p-8 md:p-16 shadow-xl shadow-primary/5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-8">
            <Scale className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-primary">Legal</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">Terms & Conditions</h1>
          <p className="text-primary/40 mb-12">Last Updated: {lastUpdated}</p>

          <div className="space-y-12 text-primary/70 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing SummerInternships.in, you agree to comply with and be bound by these Terms and Conditions. Our platform is a curated discovery service for internship opportunities.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">2. Use of Service</h2>
              <p>
                The information provided on this platform is for general informational purposes. While we strive for accuracy, the information (including stipends, dates, and eligibility) is subject to change at the discretion of the respective institutions/companies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">3. No Guarantee</h2>
              <p>
                SummerInternships.in does not guarantee placement or selection in any internship program. We facilitate discovery, but the selection process is entirely handled by the external providers. 
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">4. Intellectual Property</h2>
              <p>
                All content, design, and logic on this platform are the intellectual property of SummerInternships.in. Unauthorized scraping or commercial use of our datasets is strictly prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">5. Limitation of Liability</h2>
              <p>
                In no event shall SummerInternships.in be liable for any direct or indirect damages resulting from your use of the platform or reliance on the information provided herein.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">6. Governing Law</h2>
              <p>
                These terms shall be governed by and construed in accordance with the laws of India.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
