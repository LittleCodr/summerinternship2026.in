import { NextResponse } from "next/server";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const runtime = "edge";

export async function GET() {
  try {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const blogsCollection = collection(db, "blogs");
    const jobsCollection = collection(db, "jobs");

    let blogsAdded = 0;
    let jobsAdded = 0;

    // We will generate data for the past 5 days and future 30 days
    // 2 blogs per day and 10 jobs per day
    for (let dayOffset = -5; dayOffset <= 30; dayOffset++) {
      const targetDate = new Date(today);
      targetDate.setDate(today.getDate() + dayOffset);
      const publishDateStr = targetDate.toISOString();

      // Generate 2 blogs
      for (let i = 1; i <= 2; i++) {
        const title = `Insightful Guide on Tech Careers ${dayOffset > 0 ? "Upcoming " : ""}${Math.abs(dayOffset)}-${i}`;
        const slug = `insightful-guide-tech-careers-${dayOffset}-${i}`.replace(/-/g, "-");
        
        await setDoc(doc(blogsCollection, slug), {
          title,
          slug,
          content: `<p>This is a comprehensive guide to tech careers. It covers various aspects from software engineering to data science.</p><p>Stay ahead of the curve by learning new skills.</p>`,
          excerpt: `A deep dive into navigating a tech career successfully.`,
          author: "Admin",
          publishDate: publishDateStr,
          tags: ["career", "technology", "guide"],
          imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000",
        });
        blogsAdded++;
      }

      // Generate 10 jobs
      for (let j = 1; j <= 10; j++) {
        const title = `Software Engineer Role ${dayOffset > 0 ? "Upcoming " : ""}${Math.abs(dayOffset)}-${j}`;
        const slug = `software-engineer-role-${dayOffset}-${j}`;

        await setDoc(doc(jobsCollection, slug), {
          title,
          slug,
          company: `TechCorp ${j}`,
          location: `Remote / India`,
          description: `We are looking for a skilled Software Engineer to join our team. You will be working on cutting-edge technologies.`,
          requirements: ["React", "Next.js", "Firebase", "TypeScript"],
          publishDate: publishDateStr,
          applyUrl: "https://example.com/apply",
          type: "Full-time",
        });
        jobsAdded++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${blogsAdded} blogs and ${jobsAdded} jobs.`,
    });
  } catch (error) {
    console.error("Error seeding data: ", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
