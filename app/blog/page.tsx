import { Clock, ArrowRight, Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";

const posts = [
  {
    id: 1,
    title: "How AI is Revolutionizing Content Creation in 2025",
    excerpt: "AI tools are transforming how we create content. From blog posts to social media, discover how WriteFlow AI is leading the charge.",
    category: "AI & Technology",
    readTime: "5 min read",
    date: "June 10, 2025",
    image: "🤖",
    color: "from-amber-500 to-amber-500",
  },
  {
    id: 2,
    title: "10 Tips for Writing Better Blog Posts with AI",
    excerpt: "Learn how to combine human creativity with AI assistance to produce blog posts that rank and convert.",
    category: "Writing Tips",
    readTime: "7 min read",
    date: "June 8, 2025",
    image: "✍️",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: 3,
    title: "Social Media Content Strategy for 2025",
    excerpt: "Discover the latest trends and strategies for creating engaging social media content using AI tools.",
    category: "Social Media",
    readTime: "6 min read",
    date: "June 5, 2025",
    image: "📱",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: 4,
    title: "Email Marketing: How AI Can Double Your Open Rates",
    excerpt: "Find out how AI-generated subject lines and email copy can significantly improve your email marketing metrics.",
    category: "Email Marketing",
    readTime: "8 min read",
    date: "June 2, 2025",
    image: "📧",
    color: "from-amber-500 to-orange-500",
  },
  {
    id: 5,
    title: "The Future of SEO: Writing for Both Humans and AI",
    excerpt: "SEO is evolving fast. Learn how to optimize your content for both search engines and AI assistants.",
    category: "SEO",
    readTime: "9 min read",
    date: "May 30, 2025",
    image: "🔍",
    color: "from-violet-500 to-purple-500",
  },
  {
    id: 6,
    title: "Building a Content Calendar with AI Assistance",
    excerpt: "Plan months of content in hours with AI-powered content calendar strategies and WriteFlow AI templates.",
    category: "Content Strategy",
    readTime: "5 min read",
    date: "May 28, 2025",
    image: "📅",
    color: "from-blue-500 to-amber-500",
  },
];

const categoryColors: Record<string, string> = {
  "AI & Technology": "bg-amber-100 text-amber-700",
  "Writing Tips": "bg-emerald-100 text-emerald-700",
  "Social Media": "bg-pink-100 text-pink-700",
  "Email Marketing": "bg-amber-100 text-amber-700",
  "SEO": "bg-violet-100 text-violet-700",
  "Content Strategy": "bg-blue-100 text-blue-700",
};

export default function BlogPage() {
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className=" py-16 px-4">
        <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-xs font-semibold  hover: transition-colors tracking-widest uppercase"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 " />
            <span className=" font-black text-xl">WriteFlow Blog</span>
          </div>
          <h1 className="text-4xl font-black  mb-4">
            Content, AI & Writing Tips
          </h1>
          <p className="text-lg">
            Content creation, AI tools ও writing strategies নিয়ে আমাদের latest articles।
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 mt-4">
        {/* Featured Post */}
        <div className="mb-12">
          <h2 className="text-sm font-black text-gray-400 uppercase tracking-wider mb-4">Featured Post</h2>
          <div className={`bg-gradient-to-br ${featured.color} rounded-2xl p-8 text-white relative overflow-hidden`}>
            <div className="absolute right-6 top-6 text-6xl opacity-20">{featured.image}</div>
            <span className="px-3 py-1 bg-white/20 rounded-xl text-xs font-bold mb-4 inline-block">
              {featured.category}
            </span>
            <h3 className="text-2xl font-black mb-3 max-w-xl">{featured.title}</h3>
            <p className="text-white/80 text-sm mb-5 max-w-lg">{featured.excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-white/70 text-xs">
                <Clock className="h-3.5 w-3.5" />
                <span>{featured.readTime}</span>
                <span>·</span>
                <span>{featured.date}</span>
              </div>
              <Link
                href={`/blog/${featured.id}`}
                className="flex items-center gap-2 px-4 py-2 bg-white text-amber-600 text-xs font-bold rounded-xl hover:bg-gray-50 transition-all"
              >
                Read More <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* All Posts */}
        <h2 className="text-sm font-black text-gray-400 uppercase tracking-wider mb-4">All Articles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map((post) => (
            <div key={post.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all group">
              <div className={`bg-gradient-to-br ${post.color} p-8 flex items-center justify-center`}>
                <span className="text-5xl">{post.image}</span>
              </div>
              <div className="p-5">
                <span className={`px-2 py-1 rounded-lg text-xs font-bold ${categoryColors[post.category]}`}>
                  {post.category}
                </span>
                <h3 className="text-gray-900 font-black text-sm mt-3 mb-2 group-hover:text-amber-600 transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                  <Link
                    href={`/blog/${post.id}`}
                    className="flex items-center gap-1 text-amber-600 text-xs font-bold hover:gap-2 transition-all"
                  >
                    Read <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}