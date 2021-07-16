import styles from "../styles/Pages/All/All.module.css";
import { SearchIcon } from "@heroicons/react/outline";

const All: React.FC = (props) => {
  return (
    <article>
      <section className={styles.headerContainer}>
        <header className={styles.header}>
          <article className={styles.searchBarItemContainer}>
            <button>Projects</button>
            <button>Posts</button>
          </article>

          <article className={styles.searchContainer}>
            <span className={styles.searchIconWrapper}>
              <SearchIcon width={18} height={18} />
            </span>
            <input
              className={styles.searchInputField}
              placeholder={"Search for something"}
            />
          </article>

          <article className={styles.searchBarItemContainer}>
            <button>Clear</button>
          </article>
        </header>
      </section>

      <section className={styles.bodyContainer}>
        <aside className={styles.sidebarContainer}>Tags</aside>
        <article>All page body</article>
      </section>
    </article>
  );
};

export default All;
