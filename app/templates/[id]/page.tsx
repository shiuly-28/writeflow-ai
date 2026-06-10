import { Star, Zap, ArrowLeft, Users, FileText, Sparkles } from "lucide-react";
import Link from "next/link";

const templates = [
  {
    id: 1,
    title: "Blog Post Writer",
    description: "Professional blog posts with SEO optimization",
    overview: "এই template টি professional blog post লেখার জন্য তৈরি। AI আপনার topic নিয়ে SEO-friendly, engaging blog post তৈরি করবে যা readers কে আকৃষ্ট করবে।",
    bestFor: "Bloggers, Content Marketers, Business Owners যারা regular blog content publish করতে চান।",
    category: "Blog",
    rating: 4.8,
    usageCount: 1240,
    tone: "Professional",
    wordCount: "800-1000",
    aiModel: "Gemini 2.5 Flash",
    image: "📝",
    features: ["SEO Optimized", "Meta Description", "Tags Suggestion", "Structured Format"],
    reviews: [
      { id: 1, user: "Rahim Ahmed", role: "Content Writer", rating: 5, comment: "Amazing template! Saves me hours every week." },
      { id: 2, user: "Fatima Khan", role: "Blogger", rating: 5, comment: "The AI generates very natural and engaging content." },
      { id: 3, user: "John Doe", role: "Marketer", rating: 4, comment: "Great for quick blog posts. Highly recommended!" },
    ],
    relatedIds: [2, 3, 6, 7],
  },
  {
    id: 2,
    title: "Social Media Caption",
    description: "Engaging captions for Instagram, Facebook & Twitter",
    overview: "Social media এর জন্য engaging captions তৈরি করো। AI তোমার topic থেকে multiple caption variations তৈরি করবে সাথে relevant hashtags।",
    bestFor: "Social Media Managers, Influencers, Small Business Owners যারা social media presence বাড়াতে চান।",
    category: "Social Media",
    rating: 4.9,
    usageCount: 2150,
    tone: "Casual",
    wordCount: "50-150",
    aiModel: "Gemini 2.5 Flash",
    image: "📱",
    features: ["Multiple Variations", "Hashtag Suggestions", "Emoji Friendly", "Platform Optimized"],
    reviews: [
      { id: 1, user: "Sara Islam", role: "Influencer", rating: 5, comment: "Best caption generator I've used!" },
      { id: 2, user: "Mike Chen", role: "Social Media Manager", rating: 5, comment: "Saves so much time creating content." },
    ],
    relatedIds: [1, 3, 7, 8],
  },
  {
    id: 3,
    title: "Email Newsletter",
    description: "Professional email newsletters that convert",
    overview: "Professional email newsletter তৈরি করো যা subscribers দের engage করে। AI complete email structure তৈরি করবে subject line থেকে CTA পর্যন্ত।",
    bestFor: "Email Marketers, Business Owners, Entrepreneurs যারা email marketing করতে চান।",
    category: "Email",
    rating: 4.7,
    usageCount: 890,
    tone: "Friendly",
    wordCount: "300-500",
    aiModel: "Gemini 2.5 Flash",
    image: "📧",
    features: ["Subject Line", "CTA Included", "Personalization", "Mobile Friendly"],
    reviews: [
      { id: 1, user: "David Park", role: "Email Marketer", rating: 5, comment: "Excellent email templates with great CTAs!" },
    ],
    relatedIds: [1, 2, 4, 8],
  },
  {
    id: 4,
    title: "Ad Copy Generator",
    description: "High-converting ad copy for any platform",
    overview: "High-converting ad copy তৈরি করো যা আপনার product বা service এর জন্য সর্বোচ্চ conversion নিয়ে আসবে।",
    bestFor: "Digital Marketers, Business Owners, Advertisers যারা paid ads run করেন।",
    category: "Ad Copy",
    rating: 4.6,
    usageCount: 670,
    tone: "Persuasive",
    wordCount: "50-200",
    aiModel: "Gemini 2.5 Flash",
    image: "📢",
    features: ["Headline Variations", "CTA Optimized", "Platform Specific", "A/B Test Ready"],
    reviews: [
      { id: 1, user: "Lisa Wong", role: "Digital Marketer", rating: 4, comment: "Good ad copy suggestions, very persuasive!" },
    ],
    relatedIds: [1, 5, 6, 7],
  },
  {
    id: 5, title: "Product Description", description: "Compelling product descriptions that sell",
    overview: "Compelling product descriptions তৈরি করো।", bestFor: "E-commerce owners.",
    category: "Ad Copy", rating: 4.5, usageCount: 540, tone: "Persuasive",
    wordCount: "100-300", aiModel: "Gemini 2.5 Flash", image: "🛍️",
    features: ["SEO Friendly", "Benefit Focused", "Keyword Rich", "Conversion Optimized"],
    reviews: [], relatedIds: [4, 6, 7, 8],
  },
  {
    id: 6, title: "YouTube Script", description: "Engaging video scripts for YouTube content",
    overview: "YouTube video এর জন্য complete script তৈরি করো।", bestFor: "YouTubers, Video Creators.",
    category: "Blog", rating: 4.7, usageCount: 430, tone: "Casual",
    wordCount: "500-800", aiModel: "Gemini 2.5 Flash", image: "🎬",
    features: ["Hook Included", "Scene Breakdown", "CTA Optimized", "Engaging Format"],
    reviews: [], relatedIds: [1, 2, 7, 8],
  },
  {
    id: 7, title: "LinkedIn Post", description: "Professional LinkedIn posts for networking",
    overview: "Professional LinkedIn posts তৈরি করো।", bestFor: "Professionals, Job Seekers.",
    category: "Social Media", rating: 4.8, usageCount: 780, tone: "Professional",
    wordCount: "150-300", aiModel: "Gemini 2.5 Flash", image: "💼",
    features: ["Professional Tone", "Hashtags", "Engagement Optimized", "Network Friendly"],
    reviews: [], relatedIds: [1, 2, 3, 8],
  },
  {
    id: 8, title: "Cold Email", description: "Cold emails that get responses",
    overview: "Cold emails তৈরি করো যা response পায়।", bestFor: "Sales Teams, Freelancers.",
    category: "Email", rating: 4.4, usageCount: 320, tone: "Friendly",
    wordCount: "150-250", aiModel: "Gemini 2.5 Flash", image: "✉️",
    features: ["Personalized", "Short & Crisp", "CTA Clear", "Follow-up Ready"],
    reviews: [], relatedIds: [3, 4, 5, 7],
  },
];

const categoryColors: Record<string, string> = {
  Blog: "bg-amber-100 text-amber-700",
  "Social Media": "bg-pink-100 text-pink-700",
  Email: "bg-emerald-100 text-emerald-700",
  "Ad Copy": "bg-amber-100 text-amber-700",
};

export default async function TemplateDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const template = templates.find((t) => t.id === parseInt(id));
  const related = templates.filter((t) => template?.relatedIds.includes(t.id));

  if (!template) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center ">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Template পাওয়া যায়নি।</p>
          <Link href="/explore" className="text-amber-600 text-sm mt-2 hover:underline block">
            ← Explore এ ফিরে যাও
          </Link>
        </div>
      </div>
    );
  }

  const avgRating = template.reviews.length
    ? (template.reviews.reduce((a, r) => a + r.rating, 0) / template.reviews.length).toFixed(1)
    : template.rating;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-amber-600 to-amber-500 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <Link href="/explore" className="inline-flex text-white items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Explore এ ফিরে যাও
          </Link>

          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="text-6xl">{template.image}</div>
            <div className="flex-1">
              <span className={`px-3 py-1 rounded-xl text-xs font-bold ${categoryColors[template.category]} mb-3 inline-block`}>
                {template.category}
              </span>
              <h1 className="text-3xl font-black text-white mb-2">{template.title}</h1>
              <p className="text-white/80 text-lg mb-4">{template.description}</p>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                  <span className="text-white font-bold">{avgRating}</span>
                  <span className="text-white/60 text-sm">({template.reviews.length} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="h-4 w-4 text-white/70" />
                  <span className="text-white/70 text-sm">{template.usageCount.toLocaleString()} uses</span>
                </div>
              </div>
            </div>

            <Link
              href={`/dashboard/documents/new?template=${template.id}&type=${encodeURIComponent(template.category)}&tone=${template.tone}`}
              className="flex items-center gap-2 px-6 py-3 bg-white text-amber-600 font-bold rounded-2xl hover:bg-gray-50 transition-all shadow-lg whitespace-nowrap"
            >
              <Sparkles className="h-5 w-5" />
              Use Template
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left — Overview & Reviews */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-3">
                Overview
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">{template.overview}</p>

              <h3 className="text-sm font-black text-gray-900 mt-5 mb-2">Best Suited For</h3>
              <div className="flex items-start gap-2">
                <Users className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-gray-600 text-sm">{template.bestFor}</p>
              </div>

              <h3 className="text-sm font-black text-gray-900 mt-5 mb-3">Features</h3>
              <div className="grid grid-cols-2 gap-2">
                {template.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 bg-amber-50 rounded-xl px-3 py-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span className="text-xs font-semibold text-amber-700">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sample Output */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-3">
                Sample Output
              </h2>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs text-gray-500 font-semibold mb-2">Example AI-generated content:</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {template.category === "Blog" && "# The Future of AI in 2025\n\nArtificial Intelligence is transforming every industry at an unprecedented pace. From healthcare to finance, AI-powered solutions are revolutionizing how we work and live..."}
                  {template.category === "Social Media" && "🚀 Exciting news! We're thrilled to announce our latest innovation that's changing the game for content creators everywhere.\n\n✨ What makes it special?\n• AI-powered writing\n• 10x faster content creation\n• Professional results every time\n\n#ContentCreation #AI #WriteFlow"}
                  {template.category === "Email" && "Subject: Exclusive Offer Just for You!\n\nHi [Name],\n\nI hope this email finds you well. I'm reaching out because I have something special that I think you'll love...\n\nBest regards,\n[Your Name]"}
                  {template.category === "Ad Copy" && "🎯 Stop Wasting Time on Content!\n\nWriteFlow AI writes professional content in seconds.\n✅ Blog posts, emails & social media\n✅ 10x faster than manual writing\n✅ Used by 10,000+ creators\n\n👉 Try it FREE today!"}
                </p>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-4">
                Reviews ({template.reviews.length})
              </h2>

              {template.reviews.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-6">এখনো কোনো review নেই।</p>
              ) : (
                <div className="space-y-4">
                  {template.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-500 flex items-center justify-center text-white text-xs font-bold">
                          {review.user[0]}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{review.user}</p>
                          <p className="text-xs text-gray-400">{review.role}</p>
                        </div>
                        <div className="ml-auto flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className={`h-3.5 w-3.5 ${s <= review.rating ? "text-amber-400 fill-amber-400" : "text-gray-200"}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right — Key Info */}
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-sm font-black text-gray-900 uppercase tracking-tight mb-4">
                Key Information
              </h2>
              <div className="space-y-3">
                {[
                  { label: "Category", value: template.category },
                  { label: "Estimated Words", value: template.wordCount },
                  { label: "Tone", value: template.tone },
                  { label: "AI Model", value: template.aiModel },
                  { label: "Total Uses", value: template.usageCount.toLocaleString() },
                  { label: "Rating", value: `${template.rating} / 5.0` },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <span className="text-xs text-gray-400 font-medium">{item.label}</span>
                    <span className="text-xs font-bold text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>

              <Link
                href={`/dashboard/documents/new?template=${template.id}&type=${encodeURIComponent(template.category)}&tone=${template.tone}`}
                className="w-full flex items-center justify-center gap-2 py-3 mt-5 bg-gradient-to-r from-amber-600 to-amber-500 text-white text-sm font-bold rounded-xl hover:opacity-90 transition-all"
              >
                <Sparkles className="h-4 w-4" />
                Use This Template
              </Link>
            </div>
          </div>
        </div>

        {/* Related Templates */}
        {related.length > 0 && (
          <div className="mt-10">
            <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-5">
              Related <span className="text-amber-600">Templates</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((t) => (
                <Link
                  key={t.id}
                  href={`/templates/${t.id}`}
                  className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg hover:border-amber-200 transition-all group"
                >
                  <div className="text-3xl mb-3">{t.image}</div>
                  <span className={`px-2 py-1 rounded-lg text-xs font-bold ${categoryColors[t.category]}`}>
                    {t.category}
                  </span>
                  <h3 className="text-gray-900 font-bold text-sm mt-2 group-hover:text-amber-600 transition-colors">
                    {t.title}
                  </h3>
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-bold text-gray-700">{t.rating}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}