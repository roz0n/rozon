import GhostContentAPI from "@tryghost/content-api";

const { GHOST_SITE_URL, GHOST_API_KEY } = process.env;

const Ghost = new GhostContentAPI({
  url: GHOST_SITE_URL,
  key: GHOST_API_KEY,
  version: "v3",
});

const getPostsByPrimaryTag = (tag: string) => {
  return Ghost.posts.browse({
    include: ["tags", "authors"],
    filter: `tag:${tag}`,
  });
};

const getPostBySlug = (slug: string) => {
  return Ghost.posts.read(
    {
      slug,
    },
    {
      include: ["tags"],
    }
  );
};

export { Ghost, getPostsByPrimaryTag, getPostBySlug };
