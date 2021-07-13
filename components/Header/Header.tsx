import styles from "../../styles/Header/Header.module.css";
import { HeaderProps } from "../..";
import { HeaderNavigationItem } from "../..";
import HeaderButton from "./HeaderButton";
import GithubIcon from "../Icons/GithubIcon";
import DribbbleIcon from "../Icons/DribbbleIcon";
import LinkedInIcon from "../Icons/LinkedInIcon";
import TwitterIcon from "../Icons/TwitterIcon";
import DisplayModeIcon from "../Icons/DisplayModeIcon";

const navigationItems: HeaderNavigationItem[] = [
  {
    icon: <GithubIcon height={46} width={46} />,
    alt: "A link to my Github account",
    url: "https://www.github.com/roz0n",
  },
  {
    icon: <DribbbleIcon height={46} width={46} />,
    alt: "A link to my Dribbble profile",
    url: "https://www.dribbble.com/roz0n",
  },
  {
    icon: <LinkedInIcon height={46} width={46} />,
    alt: "A link to my LinkedIn page",
    url: "https://www.linkedin.com/in/rozon",
  },
  {
    icon: <TwitterIcon height={46} width={46} />,
    alt: "A link to my Twitter account",
    url: "https://www.twitter.com/roz0n",
  },
];

const displayModeNavigationItem: HeaderNavigationItem = {
  icon: <DisplayModeIcon height={46} width={46} />,
  alt: "Toggle dark mode",
};

const Header: React.FC<HeaderProps> = ({ handleDisplayModeToggle }) => {
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
          alt={displayModeNavigationItem.alt}
          onClick={handleDisplayModeToggle}
        >
          {displayModeNavigationItem.icon}
        </HeaderButton>
      </header>
      <nav className={styles.navigation}>
        {navigationItems.map((item) => {
          return (
            <HeaderButton key={`${item.alt}`} alt={item.alt} url={item.url}>
              {item.icon}
            </HeaderButton>
          );
        })}
      </nav>
    </article>
  );
};

export default Header;