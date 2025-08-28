import { Link } from "@remix-run/react";
import styles from "./Footer.module.css";
import SvgGithub from "./icons/Github";
import SvgInstagram from "./icons/Instagram";
import SvgLinkedIn from "./icons/LinkedIn";
import SvgLogo from "./icons/Logo";
import Icon from "./ui/Icon";

const Footer = () => (
  <footer className={styles.footer}>
    <div className="container">
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Icon glyph={SvgLogo} className={styles.logoIcon} /> Pagepure
        </div>
        <div>
          <h3 className={styles.title}>Links</h3>
          <ul className={styles.list}>
            <li className={styles.item}>
              <Link to="/about" className={styles.itemlink}>
                About
              </Link>
            </li>
            <li className={styles.item}>
              <a
                href="https://www.kayvdr.com"
                className={styles.itemlink}
                target="_blank"
              >
                kayvdr.com
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className={styles.title}>Social Media</h3>
          <div className={styles.social}>
            <a
              href="https://www.instagram.com/kaycodes_/"
              className={styles.socialLink}
              target="_blank"
            >
              <Icon glyph={SvgInstagram} className={styles.socialIcon} />
            </a>
            <a
              href="https://github.com/kayvdr"
              className={styles.socialLink}
              target="_blank"
            >
              <Icon glyph={SvgGithub} className={styles.socialIcon} />
            </a>
            <a
              href="https://www.linkedin.com/in/kay-vieider-b8a977276"
              className={styles.socialLink}
              target="_blank"
            >
              <Icon glyph={SvgLinkedIn} className={styles.socialIcon} />
            </a>
          </div>
        </div>
      </div>
      <p className={styles.copyright}>
        &copy; 2025 Pagepure ltd. All rights reserved.{" "}
        <Link to="/terms-of-service" className={styles.copyrightLink}>
          Terms of Use
        </Link>{" "}
        <Link to="/privacy" className={styles.copyrightLink}>
          Privacy Policy
        </Link>
      </p>
    </div>
  </footer>
);

export default Footer;
