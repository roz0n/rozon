import styles from "../styles/Pages/Search/Search.module.css";
import { SearchPageProps } from "../";
import { getPostsByPrimaryTag, getAllTags } from "../lib/ghost";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SearchIcon } from "@heroicons/react/outline";
import { AdjustmentsIcon, XIcon } from "@heroicons/react/solid";
import SearchProjectPost from "../components/Search/SearchProjectPost";
import SearchTagBar from "../components/Search/SearchTagBar";
import { PROJECTS, POSTS } from "../utils/constants";

export const getStaticProps = async () => {
  let props: SearchPageProps = {};

  try {
    const projects = await getPostsByPrimaryTag(PROJECTS);
    props.projects = projects;
  } catch (error) {
    props.projectsError = true;
  }

  try {
    const blogPosts = await getPostsByPrimaryTag(POSTS);
    props.blogPosts = blogPosts;
  } catch (error) {
    props.blogPostsError = true;
  }

  try {
    const allTags = await getAllTags();
    props.tags = allTags;
  } catch (error) {
    props.tagsError = true;
  }

  return {
    props,
    revalidate: 30,
  };
};

const Search: React.FC<SearchPageProps> = ({
  projects,
  blogPosts,
  tags,
  projectsError,
  blogPostsError,
  tagsError,
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [postsSelected, setPostsSelected] = useState(false);
  const [projectsSelected, setProjectsSelected] = useState(false);

  // console.log("QUERY", router.query);
  // console.log("PROJECTS", projects);
  // console.log("POSTS", blogPosts);
  // console.log("TAGS", tags);
  // console.log("PARAMS", router.query.type);

  // Helpers
  const isButtonEnabled = (state: boolean) => {
    return state;
  };

  // Event handlers
  function handleSearchBar(e) {
    console.log("Searching:", e.target.value);
    setSearchQuery(e.target.value);
  }

  function handleClearButton() {
    setSearchQuery("");
  }

  /*
    NOTE: Before making any modifications to this function, be sure to take a few deep breaths.
    I seriously hope there's an easier way to do this that I am not privy to.
  */
  function toggleFilterButton(
    buttonName: string,
    stateHandler: (boolean) => void
  ) {
    const typeQuery = router.query?.type as string;

    if (!typeQuery) {
      // No type is not present, set the state to true and add it to the query param
      stateHandler(true);

      router.push({
        pathname: "/search",
        query: { type: buttonName },
      });
    } else {
      // A value for type is present, split it and check its value
      const splitQuery = typeQuery.split(",");

      if (splitQuery.includes(buttonName)) {
        // The value we are checking for is already in the query, remove it and set the state to false
        const removeIndex = splitQuery.indexOf(buttonName);

        splitQuery.splice(removeIndex, 1);
        stateHandler(false);

        // If there are no values remaining in the type query param array, just remove it from the url (`type=` is not ideal)
        // Otherwise, convert the array to a string and do the dance.
        const queryObject = !splitQuery.length
          ? null
          : { type: splitQuery.toString() };

        router.push({
          pathname: "/search",
          query: queryObject,
        });
      } else {
        // There is a value present in the type query param array, but it's not the value we're trying to set.
        // In that case, just add it to the array and do the dance.
        splitQuery.push(buttonName);

        router.push({
          pathname: "/search",
          query: { type: splitQuery.toString() },
        });
      }
    }
  }

  // Effects

  // Handle type query on load
  useEffect(() => {
    const typeQuery = router.query?.type as string;

    // There's no type query, do nothing.
    if (!typeQuery) return;

    // There's a type query, turn it to an array.
    const splitQuery = typeQuery.split(",");

    // If the split worked, set the appropriate state depending on which string is present.
    if (!splitQuery.length) return;
    if (splitQuery.includes(PROJECTS)) setProjectsSelected(true);
    if (splitQuery.includes(POSTS)) setPostsSelected(true);
  }, [router]);

  return (
    <article>
      <section className={styles.headerContainer}>
        <header className={styles.header}>
          <article className={styles.searchBarItemContainer}>
            <span className={styles.filterIconWrapper}>
              <AdjustmentsIcon
                width={20}
                height={20}
                fill={"var(--site-main-text"}
              />
            </span>
            <button
              className={
                !isButtonEnabled(projectsSelected)
                  ? styles.filterItemButton
                  : `${styles.filterItemButton} ${styles.filterItemButtonSelected}`
              }
              onClick={() => toggleFilterButton(PROJECTS, setProjectsSelected)}
            >
              Projects
            </button>
            <button
              className={
                !isButtonEnabled(postsSelected)
                  ? styles.filterItemButton
                  : `${styles.filterItemButton} ${styles.filterItemButtonSelected}`
              }
              onClick={() => toggleFilterButton(POSTS, setPostsSelected)}
            >
              Posts
            </button>
          </article>

          <article className={styles.searchContainer}>
            <span className={styles.searchIconWrapper}>
              <SearchIcon
                width={18}
                height={18}
                stroke={"var(--site-main-text"}
              />
            </span>
            <input
              className={styles.searchInputField}
              placeholder={"Search for something"}
              onChange={(e) => handleSearchBar(e)}
              value={searchQuery}
            />
          </article>

          <article className={styles.searchBarItemContainer}>
            <span
              className={styles.clearIconWrapper}
              onClick={handleClearButton}
            >
              <XIcon width={18} height={18} fill={"var(--site-main-text"} />
            </span>
          </article>
        </header>
      </section>

      <section className={styles.bodyContainer}>
        <aside className={styles.sidebarContainer}>
          <header>
            <h1 className={styles.sidebarTitle}>Tags</h1>
          </header>
          <section className={styles.tagListContainer}>
            {tags?.map((tag) => (
              <SearchTagBar
                key={tag.name}
                name={tag.name}
                count={tag.count?.posts || 0}
              />
            ))}
          </section>
        </aside>
        <article className={styles.contentContainer}>
          <section className={styles.contentHeaderContainer}>
            <header>
              <h1 className={styles.contentTitle}>Results</h1>
            </header>
            {searchQuery && (
              <p className={styles.contentSubheader}>
                2 results retrieved for "{`${searchQuery}`}"
              </p>
            )}
          </section>

          <section className={styles.resultsListContainer}>
            {projects?.map((project) => (
              <SearchProjectPost
                key={project.title}
                title={project.title}
                slug={project.slug}
                excerpt={project.excerpt}
              />
            ))}
          </section>
        </article>
      </section>
    </article>
  );
};

export default Search;
