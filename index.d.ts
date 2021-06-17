import { PostsOrPages } from "@tryghost/content-api";

// Global

export type Post = {
  id: string;
  title: string;
  slug: string;
  custom_excerpt: string;
  reading_time: string;
  published_at: string;
};

/**
 * Component specific
 */

export type FeatureSectionProps = {
  title: string;
}

/**
 * Page specific
 */

// Index

export type IndexPageProps = {
  creations?: PostsOrPages;
  thoughts?: PostsOrPages;
  revalidate?: number;
  error?: boolean;
};