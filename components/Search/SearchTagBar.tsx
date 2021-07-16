import styles from "../../styles/Pages/Search/SearchTagBar.module.css";

type SearchTagBarProps = {
  name: string;
  count: string;
};

const SearchTagBar: React.FC<SearchTagBarProps> = ({ name, count }) => {
  return (
    <article className={styles.container}>
      <p className={styles.nameContainer}>{name?.toLowerCase()}</p>
      <p className={styles.countContainer}>{count}</p>
    </article>
  );
};

export default SearchTagBar;
