import { FeatureSectionProps } from "..";
import { HeaderButtonProps } from "..";
import { PostsOrPages } from "@tryghost/content-api";

/**
 * Global
 */

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
  icon?: any;
  alt: string;
  url?: string;
  onClick?: () => void;
};

export type HeaderProps = {
  currentDisplayMode?: string;
  handleDisplayModeToggle?: () => void;
};

export type HeaderNavigationItem = HeaderButtonProps;

export type IconProps = {
  height: number;
  width: number;
  fillColor?: string;
};

export type ContactFormButtonProps = {
  label: string;
  onClick?: (label: string) => void;
  isSelected?: (label: string) => boolean;
};

export type ContactFormButtonItem = ContactFormButtonProps;

export type FeatureSectionProjectPostProps = {
  slug: string;
  title: string;
  excerpt: string;
};

export type FeatureSectionBlogPostProps = {
  slug: string;
  title: string;
  excerpt: string;
};

export type FeatureSectionButtonProps = {
  label?: string;
};

export type FeatureSectionEmptyStateProps = {
  label?: string;
};

export type WeatherDataObject = {
  temp: string;
  city_name: string;
  state_code: string;
  weather: {
    code: number;
  };
};

export type WeatherbitWidgetProps = {
  data?: WeatherDataObject[];
  error?: boolean;
};

export type SpotifyWidgetProps = {
  track?: SpotifyTrack;
  error?: boolean;
};

export type SpotifyTrack = {
  name: string;
  artist: string;
  album: string;
  previewUrl?: string;
  artworkUrl: string;
};

/**
 * Page specific
 */

// Index

export type IndexPageProps = {
  projects?: PostsOrPages;
  blogPosts?: PostsOrPages;
  revalidate?: number;
  projectsError?: boolean;
  blogPostsError?: boolean;
};

/**
 * Backend
 */

export type GhostPost = {
  id: string;
  title: string;
  slug: string;
  custom_excerpt: string;
  reading_time: string;
  published_at: string;
  html?: string;
};
