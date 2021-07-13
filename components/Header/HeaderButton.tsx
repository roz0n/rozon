import styles from "../../styles/Header/HeaderButton.module.css";
import { HeaderButtonProps } from "../..";

const HeaderButton: React.FC<HeaderButtonProps> = ({
  children,
  alt,
  url,
  onClick,
}) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <button className={styles.container} onClick={onClick}>
        {children}
      </button>
    </a>
  );
};

export default HeaderButton;
