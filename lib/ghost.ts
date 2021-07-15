import GhostContentAPI from "@tryghost/content-api";

const Ghost = new GhostContentAPI({
  url: process.env.GHOST_SITE_URL,
  key: process.env.GHOST_API_KEY,
  version: "v3",
});

const getPostsByPrimaryTag = (tag: string) => {
  return Ghost.posts.browse({
    include: ["tags", "authors"],
    filter: `tag:${tag}`,
  });
};

export { Ghost, getPostsByPrimaryTag };
