"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare, Send } from "lucide-react";

export default function Contact() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-6">
            <Mail className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-primary">Contact Us</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">We'd Love to Hear <br />from You</h1>
          <p className="text-lg text-primary/60 max-w-2xl mx-auto">
            Have a question or want to list an opportunity? Reach out to our team.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="p-8 bg-white border border-primary/5 rounded-[40px] shadow-sm">
              <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-2xl text-milk mb-6">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Email Support</h3>
              <p className="text-primary/60 mb-6 italic">Typically responds within 24 hours.</p>
              <a href="mailto:support@summerinternship2026.in" className="text-primary font-bold text-lg underline underline-offset-4">
                support@summerinternship2026.in
              </a>
            </div>

            <div className="p-8 bg-primary/5 rounded-[40px] border border-primary/10">
              <MessageSquare className="w-8 h-8 text-primary/40 mb-6" />
              <h3 className="text-xl font-bold text-primary mb-4">Partner with Us</h3>
              <p className="text-primary/60">
                Are you a recruiter at an IIT, NIT, or a top company? Let us showcase your opportunities to thousands of eligible students.
              </p>
            </div>
          </div>

          <div className="bg-white border border-primary/5 rounded-[40px] p-8 shadow-xl shadow-primary/5">
            <h3 className="text-2xl font-bold text-primary mb-8">Send a Message</h3>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-primary/60 mb-2">Your Name</label>
                <input type="text" className="w-full bg-milk/50 border border-primary/10 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-bold text-primary/60 mb-2">Email Address</label>
                <input type="email" className="w-full bg-milk/50 border border-primary/10 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-bold text-primary/60 mb-2">Message</label>
                <textarea rows={4} className="w-full bg-milk/50 border border-primary/10 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all resize-none" placeholder="How can we help?"></textarea>
              </div>
              <button disabled className="w-full bg-primary text-milk py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all opacity-50 cursor-not-allowed">
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
