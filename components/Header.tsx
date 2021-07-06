import styles from "../styles/Header/Header.module.css";
import { HeaderNavigationItem } from "..";
import HeaderButton from "./HeaderButton";
import GithubIcon from "../public/images/icons/github-icon.svg";
import DribbbleIcon from "../public/images/icons/dribbble-icon.svg";
import LinkedInIcon from "../public/images/icons/linkedin-icon.svg";
import TwitterIcon from "../public/images/icons/twitter-icon.svg";
import DarkModeToggleIcon from "../public/images/icons/dark-mode-toggle-icon.svg";

let navigationItems: HeaderNavigationItem[] = [
  {
    icon: GithubIcon,
    alt: "A link to my Github account",
    url: "https://www.github.com/roz0n",
  },
  {
    icon: DribbbleIcon,
    alt: "A link to my Dribbble profile",
    url: "https://www.dribbble.com/roz0n",
  },
  {
    icon: LinkedInIcon,
    alt: "A link to my LinkedIn page",
    url: "https://www.linkedin.com/in/rozon",
  },
  {
    icon: TwitterIcon,
    alt: "A link to my Twitter account",
    url: "https://www.twitter.com/roz0n",
  },
];

let displayModeToggleItem: HeaderNavigationItem = {
  icon: DarkModeToggleIcon,
  alt: "Toggle dark mode",
};

const Header: React.FC = (props) => {
  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logotypeContainer}>
          <article
            className={styles.logotypeImage}
            aria-label="Arnold Rozon logotype"
          >
            &nbsp;
          </article>
        </div>

        <HeaderButton
          icon={displayModeToggleItem.icon}
          alt={displayModeToggleItem.alt}
        />
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
