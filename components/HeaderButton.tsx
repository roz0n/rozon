import styles from "../styles/HeaderButton.module.css";
import { HeaderButtonProps } from "..";
import Image from "next/image";

const HeaderButton: React.FC<HeaderButtonProps> = (props) => {
  let { icon, alt, url } = props;

  return (
    <button className={styles.container}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <article className={styles.icon}>
          <Image src={icon} alt={alt} />
        </article>
      </a>
    </button>
  );
};

export default HeaderButton;
