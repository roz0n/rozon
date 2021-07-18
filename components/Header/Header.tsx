import styles from "../../styles/Header/Header.module.css";
import Link from "next/link";
import { HeaderProps } from "../..";
import { HeaderNavigationItem } from "../..";
import { DARK } from "../../pages/_app";
import HeaderButton from "./HeaderButton";
import GithubIcon from "../Icons/GithubIcon";
import DribbbleIcon from "../Icons/DribbbleIcon";
import LinkedInIcon from "../Icons/LinkedInIcon";
import TwitterIcon from "../Icons/TwitterIcon";
import DisplayModeLightIcon from "../Icons/DisplayModeLightIcon";
import DisplayModeDarkIcon from "../Icons/DisplayModeDarkIcon";

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

const darkDisplayModeNavigationItem: HeaderNavigationItem = {
  icon: <DisplayModeDarkIcon height={46} width={46} />,
  alt: "Toggle dark mode",
};

const lightDisplayModeNavigationItem: HeaderNavigationItem = {
  icon: <DisplayModeLightIcon height={46} width={46} />,
  alt: "Toggle light mode",
};

const Header: React.FC<HeaderProps> = ({
  currentDisplayMode,
  handleDisplayModeToggle,
}) => {
  const getDisplayModeItem = (mode): HeaderNavigationItem => {
    if (mode === DARK) {
      return lightDisplayModeNavigationItem;
    } else {
      return darkDisplayModeNavigationItem;
    }
  };

  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logotypeContainer}>
          <Link href="/" passHref>
            <article
              className={styles.logotypeImage}
              aria-label="Arnold Rozon logotype"
            >
              &nbsp;
            </article>
          </Link>
        </div>

        <span className={styles.displayModeButtonContainer}>
          <HeaderButton
            alt={getDisplayModeItem(currentDisplayMode).alt}
            onClick={handleDisplayModeToggle}
          >
            {getDisplayModeItem(currentDisplayMode).icon}
          </HeaderButton>
        </span>
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
