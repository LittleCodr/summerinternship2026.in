"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function Disclaimer() {
  const lastUpdated = "April 19, 2026";
  
  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border border-primary/5 rounded-[48px] p-8 md:p-16 shadow-xl shadow-primary/5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-8">
            <AlertTriangle className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-primary">Legal</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">Disclaimer</h1>
          <p className="text-primary/40 mb-12">Last Updated: {lastUpdated}</p>

          <div className="space-y-12 text-primary/70 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">1. Information Accuracy</h2>
              <p>
                The information provided by SummerInternships.in is for general informational purposes only. All information on the site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">2. External Links Disclaimer</h2>
              <p>
                The Site may contain links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us. We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites linked through the site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">3. Professional Disclaimer</h2>
              <p>
                The Site cannot and does not contain career advice. The information is provided for general informational and educational purposes only and is not a substitute for professional advice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">4. "Use at Your Own Risk"</h2>
              <p>
                Your use of the site and your reliance on any information on the site is solely at your own risk. This platform is not responsible for any application rejection, missed deadlines, or fraudulent listings that may bypass our initial verification.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">5. Errors and Omissions</h2>
              <p>
                While we have made every attempt to ensure that the information contained in this site has been obtained from reliable sources, SummerInternships.in is not responsible for any errors or omissions, or for the results obtained from the use of this information.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
