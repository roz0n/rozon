import styles from "../styles/Pages/All/All.module.css";
import { SearchIcon, FilterIcon } from "@heroicons/react/outline";
import { XCircleIcon } from "@heroicons/react/solid";

const All: React.FC = (props) => {
  return (
    <article>
      <section className={styles.headerContainer}>
        <header className={styles.header}>
          <article className={styles.searchBarItemContainer}>
            <span className={styles.searchIconWrapper}>
              <FilterIcon width={18} height={18} />
            </span>
            <button className={styles.searchBarItemButton}>Projects</button>
            <button className={styles.searchBarItemButton}>Posts</button>
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
            <span className={styles.searchIconWrapper}>
              <XCircleIcon width={24} height={24} />
            </span>
          </article>
        </header>
      </section>

      <section className={styles.bodyContainer}>
        <aside className={styles.sidebarContainer}>Tags</aside>
        <article className={styles.contentContainer}>All page body</article>
      </section>
    </article>
  );
};

export default All;
