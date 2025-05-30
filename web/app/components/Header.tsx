import { Link } from "@remix-run/react";
import classNames from "classnames";
import { useState } from "react";
import styles from "./Header.module.css";
import SvgLogo from "./icons/Logo";
import Icon from "./ui/Icon";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <Icon glyph={SvgLogo} className={styles.logoIcon} /> Pagepure
      </Link>
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
            <Link to="/" className={styles.itemLink}>
              Home
            </Link>
          </li>
          <li className={styles.item}>
            <Link to="/faq" className={styles.itemLink}>
              FAQ
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
