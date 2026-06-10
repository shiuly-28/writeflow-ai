import { Clock, ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";

const posts = [
  {
    id: 1,
    title: "How AI is Revolutionizing Content Creation in 2025",
    category: "AI & Technology",
    readTime: "5 min read",
    date: "June 10, 2025",
    image: "🤖",
    color: "from-amber-500 to-amber-500",
    content: `Artificial Intelligence is transforming the way we create content at an unprecedented pace. From automated blog posts to AI-generated social media captions, the landscape of content creation is changing rapidly.

## The Rise of AI Writing Tools

In recent years, AI writing tools have become increasingly sophisticated. Tools like WriteFlow AI can now generate human-quality content in seconds, saving writers hours of work every day.

### Key Benefits of AI Content Creation

**Speed**: AI can generate a 1000-word blog post in under 30 seconds, compared to hours for human writers.

**Consistency**: AI maintains consistent tone and style throughout your content.

**SEO Optimization**: Modern AI tools automatically optimize content for search engines.

**Cost Effectiveness**: AI reduces the cost of content production significantly.

## How WriteFlow AI is Leading the Charge

WriteFlow AI uses the latest Gemini AI models to generate high-quality content across multiple formats:

- Blog Posts
- Social Media Captions  
- Email Newsletters
- Ad Copy

## The Future of Content Creation

As AI technology continues to evolve, we can expect even more sophisticated content generation capabilities. The key is to use AI as a tool to enhance human creativity, not replace it.

Content creators who embrace AI tools will have a significant advantage over those who don't. The future belongs to those who can effectively collaborate with AI.

## Conclusion

AI is not replacing writers — it's empowering them. By using tools like WriteFlow AI, content creators can focus on strategy and creativity while AI handles the heavy lifting of content production.`,
  },
  {
    id: 2,
    title: "10 Tips for Writing Better Blog Posts with AI",
    category: "Writing Tips",
    readTime: "7 min read",
    date: "June 8, 2025",
    image: "✍️",
    color: "from-emerald-500 to-teal-500",
    content: `Writing great blog posts with AI requires a combination of human creativity and artificial intelligence. Here are 10 tips to help you get the most out of AI writing tools.

## 1. Start with a Clear Topic

Before using AI, define your topic clearly. The more specific your prompt, the better the output.

## 2. Choose the Right Tone

Select a tone that matches your audience. Professional, casual, or persuasive — each works for different contexts.

## 3. Review and Edit AI Output

Always review AI-generated content. Add your personal insights and experiences to make it unique.

## 4. Use AI for Outlines First

Generate an outline first, then expand each section. This gives you more control over the structure.

## 5. Add Real Data and Statistics

AI can generate general content, but adding real statistics makes your posts more credible.

## 6. Optimize for SEO

Use AI-suggested tags and meta descriptions, but customize them for your specific keywords.

## 7. Maintain Your Voice

Edit AI content to match your unique writing style and voice.

## 8. Use Multiple Drafts

Generate multiple versions and pick the best elements from each.

## 9. Add Personal Stories

Human experiences make content relatable. Add personal anecdotes that AI can't generate.

## 10. Proofread Carefully

Always proofread AI content for accuracy and factual errors.`,
  },
  {
    id: 3,
    title: "Social Media Content Strategy for 2025",
    category: "Social Media",
    readTime: "6 min read",
    date: "June 5, 2025",
    image: "📱",
    color: "from-pink-500 to-rose-500",
    content: `Social media content strategy has evolved significantly with the advent of AI tools. Here's how to create an effective strategy for 2025.

## Understanding the 2025 Social Media Landscape

The social media landscape in 2025 is dominated by short-form video, AI-generated content, and personalized experiences.

## Key Platforms to Focus On

**Instagram**: Still the king of visual content
**LinkedIn**: Best for B2B content
**Twitter/X**: Great for thought leadership
**TikTok**: Essential for reaching younger audiences

## Creating a Content Calendar

Plan your content at least 2 weeks in advance. Use AI tools to generate batch content efficiently.

## Engagement Strategies

- Respond to comments within 2 hours
- Use polls and questions to boost engagement
- Cross-promote content across platforms

## Measuring Success

Track these key metrics:
- Engagement rate
- Reach and impressions
- Click-through rate
- Conversion rate`,
  },
  {
    id: 4,
    title: "Email Marketing: How AI Can Double Your Open Rates",
    category: "Email Marketing",
    readTime: "8 min read",
    date: "June 2, 2025",
    image: "📧",
    color: "from-amber-500 to-orange-500",
    content: `Email marketing remains one of the highest ROI marketing channels. Here's how AI can dramatically improve your results.

## The Power of AI Subject Lines

AI can generate dozens of subject line variations and predict which ones will perform best based on your audience.

## Personalization at Scale

AI enables true 1:1 personalization across thousands of subscribers simultaneously.

## Optimal Send Times

AI analyzes your subscribers' behavior to determine the best time to send emails for maximum open rates.

## Content Optimization

AI can optimize email body content for engagement, ensuring every word counts.

## A/B Testing with AI

Run more sophisticated A/B tests with AI analyzing results in real-time.`,
  },
  {
    id: 5,
    title: "The Future of SEO: Writing for Both Humans and AI",
    category: "SEO",
    readTime: "9 min read",
    date: "May 30, 2025",
    image: "🔍",
    color: "from-violet-500 to-purple-500",
    content: `SEO is undergoing its biggest transformation yet. With AI search engines like Google SGE changing how content is discovered, writers need to adapt.

## Understanding AI Search

AI-powered search engines now summarize content directly in search results. This changes how we need to write.

## Writing for Featured Snippets

Structure your content to directly answer questions. Use clear headings and concise answers.

## E-E-A-T Signals

Experience, Expertise, Authoritativeness, and Trustworthiness are more important than ever.

## Semantic SEO

Focus on topics and concepts rather than just keywords. AI understands context and meaning.

## Long-form Content Still Wins

Despite AI summaries, comprehensive content still ranks better for complex topics.`,
  },
  {
    id: 6,
    title: "Building a Content Calendar with AI Assistance",
    category: "Content Strategy",
    readTime: "5 min read",
    date: "May 28, 2025",
    image: "📅",
    color: "from-blue-500 to-amber-500",
    content: `A well-planned content calendar is essential for consistent content marketing. AI can help you plan and create content months in advance.

## Why You Need a Content Calendar

Consistency is key in content marketing. A calendar helps you stay organized and maintain a regular publishing schedule.

## Using AI to Plan Topics

AI can suggest relevant topics based on your industry, seasonal trends, and audience interests.

## Batch Content Creation

Use AI to create multiple pieces of content in a single session. This is much more efficient than writing one piece at a time.

## Content Repurposing

AI can help you repurpose one piece of content into multiple formats — blog post, social media captions, email newsletter, and more.

## Tracking and Analytics

Integrate your content calendar with analytics to track what's working and adjust your strategy accordingly.`,
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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = posts.find((p) => p.id === parseInt(id));
  const related = posts.filter((p) => p.id !== parseInt(id)).slice(0, 3);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Post পাওয়া যায়নি।</p>
          <Link href="/blog" className="text-amber-600 text-sm mt-2 hover:underline block">
            ← Blog এ ফিরে যাও
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className={`bg-gradient-to-br ${post.color} py-16 px-4`}>
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Blog এ ফিরে যাও
          </Link>

          <div className="text-5xl mb-6">{post.image}</div>
          <span className={`px-3 py-1 rounded-xl text-xs font-bold bg-white/20 text-white mb-4 inline-block`}>
            {post.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-4">{post.title}</h1>
          <div className="flex items-center gap-3 text-white/70 text-sm">
            <Clock className="h-4 w-4" />
            <span>{post.readTime}</span>
            <span>·</span>
            <span>{post.date}</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Content */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm mb-8">
          <div className="prose prose-sm max-w-none">
            {post.content.split("\n").map((line, i) => {
              if (line.startsWith("## ")) {
                return <h2 key={i} className="text-lg font-black text-gray-900 mt-6 mb-3">{line.replace("## ", "")}</h2>;
              }
              if (line.startsWith("### ")) {
                return <h3 key={i} className="text-base font-bold text-gray-800 mt-4 mb-2">{line.replace("### ", "")}</h3>;
              }
              if (line.startsWith("**") && line.endsWith("**")) {
                return <p key={i} className="font-bold text-gray-900 mb-1">{line.replace(/\*\*/g, "")}</p>;
              }
              if (line.startsWith("- ")) {
                return <li key={i} className="text-gray-600 text-sm ml-4 mb-1 list-disc">{line.replace("- ", "")}</li>;
              }
              if (line.trim() === "") {
                return <br key={i} />;
              }
              return <p key={i} className="text-gray-600 text-sm leading-relaxed mb-2">{line}</p>;
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-amber-600 to-amber-500 rounded-2xl p-6 text-center mb-8">
          <Sparkles className="h-8 w-8 text-white mx-auto mb-3" />
          <h3 className="text-white font-black text-lg mb-2">এই content AI দিয়ে লেখা হয়েছে!</h3>
          <p className="text-white/80 text-sm mb-4">তুমিও WriteFlow AI দিয়ে এরকম content লিখতে পারো।</p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-amber-600 font-bold text-sm rounded-xl hover:bg-gray-50 transition-all"
          >
            Free তে শুরু করো →
          </Link>
        </div>

        {/* Related Posts */}
        <h2 className="text-sm font-black text-gray-400 uppercase tracking-wider mb-4">Related Articles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {related.map((p) => (
            <Link
              key={p.id}
              href={`/blog/${p.id}`}
              className="bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-md transition-all group"
            >
              <div className="text-3xl mb-3">{p.image}</div>
              <span className={`px-2 py-1 rounded-lg text-xs font-bold ${categoryColors[p.category]}`}>
                {p.category}
              </span>
              <h3 className="text-gray-900 font-bold text-xs mt-2 group-hover:text-amber-600 transition-colors leading-snug">
                {p.title}
              </h3>
              <div className="flex items-center gap-1 mt-2 text-gray-400 text-xs">
                <Clock className="h-3 w-3" />
                <span>{p.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}