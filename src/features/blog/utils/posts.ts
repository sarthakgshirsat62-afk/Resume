import type { BlogPost, BlogPostSummary } from "@/features/blog/types";
import type { BlogFrontmatter } from "@/schemas/blog";

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

import { blogFrontmatterSchema } from "@/schemas/blog";
import { truncate } from "@/utils/string";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const EXCERPT_LENGTH = 160;

function getMarkdownFilenames(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".md"));
}

export function getPostSlugs(): string[] {
  return getMarkdownFilenames().map((file) => file.replace(/\.md$/, ""));
}

function readPost(slug: string): { frontmatter: BlogFrontmatter; content: string } {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { frontmatter: blogFrontmatterSchema.parse(data), content };
}

function toExcerpt(frontmatter: BlogFrontmatter, content: string): string {
  if (frontmatter.description) return frontmatter.description;
  const plainText = content
    .replace(/[#_*`>[\]()]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return truncate(plainText, EXCERPT_LENGTH);
}

export function getAllPosts(): BlogPostSummary[] {
  const posts = getPostSlugs().map((slug) => {
    const { frontmatter, content } = readPost(slug);
    return { ...frontmatter, slug, excerpt: toExcerpt(frontmatter, content) };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!getPostSlugs().includes(slug)) return null;

  const { frontmatter, content } = readPost(slug);
  const processed = await remark().use(remarkGfm).use(remarkHtml).process(content);

  return {
    ...frontmatter,
    slug,
    excerpt: toExcerpt(frontmatter, content),
    html: processed.toString(),
  };
}
