import GhostContentAPI from "@tryghost/content-api";

const Ghost = new GhostContentAPI({
  url: process.env.GHOST_SITE_URL,
  key: process.env.CONTENT_API_KEY,
  version: "v3",
});

export default Ghost;
