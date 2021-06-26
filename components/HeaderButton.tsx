import styles from "../styles/Header/HeaderButton.module.css";
import { HeaderButtonProps } from "..";
import Image from "next/image";

const HeaderButton: React.FC<HeaderButtonProps> = (props) => {
  let { icon, alt, url } = props;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <button className={styles.container}>
        <Image src={icon} alt={alt} />
      </button>
    </a>
  );
};

export default HeaderButton;
