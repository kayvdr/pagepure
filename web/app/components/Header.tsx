import classNames from "classnames";
import { useState } from "react";
import styles from "./Header.module.css";
import SvgLogo from "./icons/Logo";
import Icon from "./ui/Icon";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <a href="/" className={styles.logo}>
        <Icon glyph={SvgLogo} className={styles.logoIcon} /> Pagepure
      </a>
      <nav className={styles.nav}>
        <button
          className={classNames(styles.hamburger, {
            [styles.active]: menuOpen,
          })}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul
          className={classNames(styles.menu, { [styles.menuOpen]: menuOpen })}
        >
          <li className={styles.item}>
            <a href="" className={styles.itemLink}>
              Home
            </a>
          </li>
          <li className={styles.item}>
            <a href="" className={styles.itemLink}>
              FAQ
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
