import { HeaderButtonProps } from '..';
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
};

export type HeaderButtonProps = {
  icon: any;
  alt: string;
  url?: string;
};

export type HeaderNavigationItem = HeaderButtonProps;

export type ContactFormButtonProps = {
  label: string;
};

export type ContactFormButtonItem = ContactFormButtonProps;

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
