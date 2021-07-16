import styles from "../styles/Pages/Search/Search.module.css";
import { SearchPageProps } from "../";
import { getPostsByPrimaryTag, getAllTags } from "../lib/ghost";
import { useRouter } from "next/router";
import { SearchIcon } from "@heroicons/react/outline";
import { AdjustmentsIcon, XIcon } from "@heroicons/react/solid";
import SearchProjectPost from "../components/Search/SearchProjectPost";
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
  console.log("QUERY", router.query);
  console.log("PROJECTS", projects);
  console.log("POSTS", blogPosts);
  console.log("TAGS", tags);
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
            <button className={styles.filterItemButton}>Projects</button>
            <button className={styles.filterItemButton}>Posts</button>
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
            />
          </article>

          <article className={styles.searchBarItemContainer}>
            <span className={styles.clearIconWrapper}>
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
          <section>
            {tags?.map((tag) => (
              <p key={tag.name}>
                {tag.name} - {tag.count?.posts || 0}
              </p>
            ))}
          </section>
        </aside>
        <article className={styles.contentContainer}>
          <section className={styles.contentHeaderContainer}>
            <header>
              <h1 className={styles.contentTitle}>Results</h1>
            </header>
            <p className={styles.contentSubheader}>
              2 results retrieved for "query"
            </p>
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
