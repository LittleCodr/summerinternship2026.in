import { getPublishedBlogs } from "@/lib/data-fetchers";
import Link from "next/link";
import { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Career Advice & Blogs | Summer Internships 2026",
  description: "Read the latest guides, career tips, and insights for your internship journey. Updated daily.",
};

export default async function BlogsPage() {
  const blogs = await getPublishedBlogs();

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-primary mb-4">
          Career Insights
        </h1>
        <p className="text-primary/60 max-w-2xl mx-auto">
          Fresh articles published daily to help you navigate your career, ace your interviews, and secure the best internships.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <Link 
            key={blog.id} 
            href={`/blogs/${blog.slug}`}
            className="group block bg-white border border-primary/5 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 transition-all duration-300"
          >
            <div className="h-48 overflow-hidden bg-primary/5">
              <img 
                src={blog.imageUrl} 
                alt={blog.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
            <div className="p-6">
              <div className="flex gap-2 mb-3">
                {blog.tags.slice(0, 2).map((tag, i) => (
                  <span key={i} className="text-[10px] uppercase tracking-wider font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-xl font-bold text-primary mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {blog.title}
              </h2>
              <p className="text-sm text-primary/60 line-clamp-3 mb-4">
                {blog.excerpt}
              </p>
              <div className="flex justify-between items-center text-xs font-semibold text-primary/40">
                <span>{blog.author}</span>
                <span>{new Date(blog.publishDate).toLocaleDateString()}</span>
              </div>
            </div>
          </Link>
        ))}

        {blogs.length === 0 && (
          <div className="col-span-full text-center py-12 text-primary/50">
            No articles found. Check back later!
          </div>
        )}
      </div>
    </main>
  );
}
