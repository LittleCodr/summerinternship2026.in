import { getBlogBySlug } from "@/lib/data-fetchers";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) {
    return { title: "Blog Not Found" };
  }
  return {
    title: `${blog.title} | Summer Internships 2026`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: "article",
      publishedTime: blog.publishDate,
      images: [blog.imageUrl],
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  // Generate BlogPosting JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "image": blog.imageUrl,
    "datePublished": blog.publishDate,
    "dateModified": blog.publishDate,
    "author": {
      "@type": "Person",
      "name": blog.author
    },
    "description": blog.excerpt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://summerinternship2026.in/blogs/${blog.slug}`
    }
  };

  return (
    <>
      <Script id={`blog-schema-${blog.id}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen pt-32 pb-20 px-4 max-w-4xl mx-auto">
        <article className="bg-white rounded-3xl overflow-hidden border border-primary/10 shadow-2xl shadow-primary/5">
          <div className="w-full h-64 md:h-96 relative">
            <img 
              src={blog.imageUrl} 
              alt={blog.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
              <div className="flex gap-2">
                {blog.tags.map((tag, i) => (
                  <span key={i} className="text-xs uppercase tracking-wider font-black text-white bg-primary/40 backdrop-blur-md px-3 py-1.5 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="p-8 md:p-12">
            <h1 className="text-3xl md:text-5xl font-black text-primary mb-6 leading-tight">
              {blog.title}
            </h1>
            
            <div className="flex items-center gap-4 text-sm font-semibold text-primary/60 mb-10 pb-10 border-b border-primary/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {blog.author.charAt(0)}
                </div>
                <span>{blog.author}</span>
              </div>
              <span>•</span>
              <time dateTime={blog.publishDate}>
                {new Date(blog.publishDate).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            
            {/* Safe HTML rendering for the blog content */}
            <div 
              className="prose prose-lg md:prose-xl max-w-none prose-p:text-primary/80 prose-headings:text-primary prose-a:text-blue-600"
              dangerouslySetInnerHTML={{ __html: blog.content }} 
            />
          </div>
        </article>
      </main>
    </>
  );
}
