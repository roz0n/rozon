import styles from "../styles/Pages/Search/Search.module.css";
import { SearchIcon } from "@heroicons/react/outline";
import {
  DesktopComputerIcon,
  AnnotationIcon,
  AdjustmentsIcon,
  XCircleIcon,
} from "@heroicons/react/solid";

const Search: React.FC = (props) => {
  return (
    <article>
      <section className={styles.headerContainer}>
        <header className={styles.header}>
          <article className={styles.searchBarItemContainer}>
            <span className={styles.filterIconWrapper}>
              <AdjustmentsIcon width={20} height={20} />
            </span>
            <button className={styles.filterItemButton}>Projects</button>
            <button className={styles.filterItemButton}>Posts</button>
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
            <span className={styles.clearIconWrapper}>
              <XCircleIcon width={22} height={22} />
            </span>
          </article>
        </header>
      </section>

      <section className={styles.bodyContainer}>
        <aside className={styles.sidebarContainer}>
          <header>
            <h1 className={styles.sidebarTitle}>Tags</h1>
          </header>
        </aside>
        <article className={styles.contentContainer}>
          <section>
            <header>
              <h1 className={styles.contentTitle}>Results</h1>
            </header>
          </section>
        </article>
      </section>
    </article>
  );
};

export default Search;
