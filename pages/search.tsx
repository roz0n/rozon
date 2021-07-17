import styles from "../styles/Pages/Search/Search.module.css";
import { SearchPageProps } from "../";
import { getPostsByPrimaryTag, getAllTags } from "../lib/ghost";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SearchIcon } from "@heroicons/react/outline";
import { AdjustmentsIcon, XIcon } from "@heroicons/react/solid";
import SearchProjectPost from "../components/Search/SearchProjectPost";
import SearchTagBar from "../components/Search/SearchTagBar";
import { PROJECTS, BLOG_POSTS } from "../utils/constants";

export const getStaticProps = async () => {
  let props: SearchPageProps = {};

  try {
    const projects = await getPostsByPrimaryTag(PROJECTS);
    props.projects = projects;
  } catch (error) {
    props.projectsError = true;
  }

  try {
    const blogPosts = await getPostsByPrimaryTag(BLOG_POSTS);
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

  function toggleProjectsButton() {
    // console.log("Projects button toggled");
    // const currentQuery = router.query?.type;
    // const currentQueryValues = currentQuery[0]?.split(",");
    // const containsDesiredValue = currentQueryValues.includes(PROJECTS);
    // if (containsDesiredValue && projectsSelected) {
    //   // Toggle it off
    //   const index = currentQueryValues.indexOf(PROJECTS);
    //   currentQueryValues.splice(index);
    //   router.push({
    //     pathname: "/search",
    //     query: { type: currentQueryValues.toString() },
    //   });
    // } else {
    //   // Toggle it on
    //   const newQuery = currentQueryValues.push(PROJECTS);
    //   router.push({
    //     pathname: "/search",
    //     query: { type: newQuery.toString() },
    //   });
    // }
  }

  function togglePostsButton() {
    // console.log("Posts button toggled");
    // if (postsSelected) {
    //   router.push({
    //     pathname: "/search",
    //     query: { type: BLOG_POSTS },
    //   });
    // } else {
    //   router.push({
    //     pathname: "/search",
    //     query: {},
    //   });
    // }
    // setPostsSelected(!postsSelected);
  }

  // Effects

  // Handle type query on load
  useEffect(() => {
    const typeQuery = router.query?.type as string;

    if (typeQuery) {
      const splitQuery = typeQuery.split(",");

      if (splitQuery.length > 1) {
        if (splitQuery.includes(PROJECTS)) {
          setProjectsSelected(true);
        }

        if (splitQuery.includes(BLOG_POSTS)) {
          setPostsSelected(true);
        }
      } else {
        // The query value onLoad is a single string, determine which one
        if (typeQuery === PROJECTS) {
          setProjectsSelected(true);
        }

        if (typeQuery === BLOG_POSTS) {
          setPostsSelected(true);
        }
      }
    }
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
              onClick={toggleProjectsButton}
            >
              Projects
            </button>
            <button
              className={
                !isButtonEnabled(postsSelected)
                  ? styles.filterItemButton
                  : `${styles.filterItemButton} ${styles.filterItemButtonSelected}`
              }
              onClick={togglePostsButton}
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
