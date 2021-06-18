import styles from "../styles/Header.module.css";
import { HeaderNavigationItem } from "..";
import HeaderButton from "./HeaderButton";
import GithubIcon from "../public/images/icons/github-icon.svg";
import DribbbleIcon from "../public/images/icons/dribbble-icon.svg";
import LinkedInIcon from "../public/images/icons/linkedin-icon.svg";
import TwitterIcon from "../public/images/icons/twitter-icon.svg";

let navigationItems: HeaderNavigationItem[] = [
  {
    icon: GithubIcon,
    alt: "My Github account",
    url: "https://www.github.com/roz0n",
  },
  {
    icon: DribbbleIcon,
    alt: "My Dribbble profile",
    url: "https://www.dribbble.com/roz0n",
  },
  {
    icon: LinkedInIcon,
    alt: "My LinkedIn page",
    url: "https://www.linkedin.com/in/rozon",
  },
  {
    icon: TwitterIcon,
    alt: "My Twitter account",
    url: "https://www.twitter.com/roz0n",
  },
];

const Header: React.FC = (props) => {
  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.logotype}>Arnold Rozon</h1>
      </header>
      <nav className={styles.navigation}>
        {navigationItems.map((item) => {
          return (
            <HeaderButton
              key={`${item.alt}`}
              icon={item.icon}
              alt={item.alt}
              url={item.url}
            />
          );
        })}
      </nav>
    </article>
  );
};

export default Header;
