import { CommentSection } from "@/components/blog/comment-section";
import { VotePanel } from "@/components/blog/vote-panel";
import { Container } from "@/components/common/container";
import { getVoteSummary } from "@/features/blog/actions";
import { getCommentThreads } from "@/features/blog/utils/comments";
import { getPostBySlug, getPostSlugs } from "@/features/blog/utils/posts";
import { formatFullDate, parseDateOnly } from "@/utils/date";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const emptyVoteSummary = { upvotes: 0, downvotes: 0, myVote: 0 } as const;
  const [threads, voteSummary] = await Promise.all([
    getCommentThreads(slug).catch((error) => {
      console.error(`Failed to load comments for ${slug}:`, error);
      return [];
    }),
    getVoteSummary({ postSlug: slug }).catch((error) => {
      console.error(`Failed to load votes for ${slug}:`, error);
      return emptyVoteSummary;
    }),
  ]);

  // biome-ignore lint/security/noDangerouslySetInnerHtml: content is authored solely by the site owner via files committed to the repo
  const body = <article className="blog-prose" dangerouslySetInnerHTML={{ __html: post.html }} />;

  return (
    <div className="pt-24 pb-24">
      <Container>
        <div className="mx-auto max-w-2xl">
          <Link
            href="/blog"
            className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>

          <span className="data-label">{formatFullDate(parseDateOnly(post.date))}</span>
          <h1
            className="text-4xl font-black tracking-tighter mt-3 mb-6"
            style={{ letterSpacing: "-0.04em" }}
          >
            {post.title}
          </h1>

          <VotePanel postSlug={post.slug} initialSummary={voteSummary} />

          <div className="mt-10">{body}</div>

          <div className="mt-16 border-t border-border pt-10">
            <CommentSection postSlug={post.slug} initialThreads={threads} />
          </div>
        </div>
      </Container>
    </div>
  );
}
