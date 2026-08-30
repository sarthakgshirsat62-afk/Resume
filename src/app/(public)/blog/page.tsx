import { PostCard } from "@/components/blog/post-card";
import { Container } from "@/components/common/container";
import { getAllPosts } from "@/features/blog/utils/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing on software, projects, and things I've learned.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="pt-24 pb-24">
      <Container>
        <div className="mb-16 max-w-2xl">
          <span className="section-label mb-6 inline-flex">Blog</span>
          <h1
            className="text-4xl sm:text-5xl font-black tracking-tighter mt-4 mb-4"
            style={{ letterSpacing: "-0.04em" }}
          >
            Notes on <span className="gradient-text">building things</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Writing on software, projects, and things I&apos;ve learned along the way.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-sm text-muted-foreground">No posts yet — check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
