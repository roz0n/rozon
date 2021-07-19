import VeximojiIcon from "../public/images/projects/veximoji-app-icon.svg";
import TrendeyeIcon from "../public/images/projects/trendeye-app-icon.png";
import { PROJECTS, POSTS } from "./constants";

export function formatProjectUrl(ghostString: string) {
  return ghostString
    .replace("<!--kg-card-begin: html-->", "")
    .replace("<!--kg-card-end: html-->", "");
}

export const restrictedTags = [PROJECTS, POSTS];

// Seems like the images are heavily compressed by Cloudinary, let's circumvent that
export const PROJECT_ICONS = {
  veximoji: VeximojiIcon,
  trendeye: TrendeyeIcon,
};
