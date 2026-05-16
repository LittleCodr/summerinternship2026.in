import { collection, query, where, getDocs, orderBy, limit, doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  publishDate: string;
  tags: string[];
  imageUrl: string;
}

export interface JobListing {
  id: string;
  title: string;
  slug: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  publishDate: string;
  applyUrl: string;
  type: string; // Full-time, Internship, etc.
}

// Fetch published blogs (publishDate <= now)
export async function getPublishedBlogs(maxLimits = 50): Promise<BlogPost[]> {
  const now = new Date().toISOString();
  const q = query(
    collection(db, "blogs"),
    where("publishDate", "<=", now),
    orderBy("publishDate", "desc"),
    limit(maxLimits)
  );

  const querySnapshot = await getDocs(q);
  const blogs: BlogPost[] = [];
  querySnapshot.forEach((doc) => {
    blogs.push({ ...doc.data(), id: doc.id } as BlogPost);
  });

  return blogs;
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const now = new Date().toISOString();
  const q = query(
    collection(db, "blogs"),
    where("slug", "==", slug),
    limit(1)
  );

  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    return null;
  }
  
  const doc = querySnapshot.docs[0];
  const data = doc.data() as BlogPost;
  
  // In-memory check to avoid complex index
  if (data.publishDate > now) {
    return null;
  }

  return { ...data, id: doc.id };
}

// Fetch published jobs (publishDate <= now)
export async function getPublishedJobs(maxLimits = 100): Promise<JobListing[]> {
  const now = new Date().toISOString();
  const q = query(
    collection(db, "jobs"),
    where("publishDate", "<=", now),
    orderBy("publishDate", "desc"),
    limit(maxLimits)
  );

  const querySnapshot = await getDocs(q);
  const jobs: JobListing[] = [];
  querySnapshot.forEach((doc) => {
    jobs.push({ ...doc.data(), id: doc.id } as JobListing);
  });

  return jobs;
}

export async function getJobBySlug(slug: string): Promise<JobListing | null> {
  const now = new Date().toISOString();
  const q = query(
    collection(db, "jobs"),
    where("slug", "==", slug),
    limit(1)
  );

  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    return null;
  }
  
  const doc = querySnapshot.docs[0];
  const data = doc.data() as JobListing;

  // In-memory check to avoid complex index
  if (data.publishDate > now) {
    return null;
  }
  
  return { ...data, id: doc.id };
}
