import styles from "../styles/Pages/All/All.module.css";
import { SearchIcon } from "@heroicons/react/outline";

const All: React.FC = (props) => {
  return (
    <article>
      <section className={styles.headerContainer}>
        <header className={styles.header}>
          <article>{/* Back button */}</article>

          <article className={styles.searchContainer}>
            <span className={styles.searchIconWrapper}>
              <SearchIcon width={18} height={18} />
            </span>
            <input
              className={styles.searchInputField}
              placeholder={"Search for something"}
            />
          </article>

          <article>{/* Something else? */}</article>
        </header>
      </section>

      <section className={styles.bodyContainer}>All page body</section>
    </article>
  );
};

export default All;
