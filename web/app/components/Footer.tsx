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
              <a href="" className={styles.itemlink}>
                About
              </a>
            </li>
            <li className={styles.item}>
              <a href="" className={styles.itemlink}>
                kayvdr.com
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className={styles.title}>Social Media</h3>
          <div className={styles.social}>
            <a href="" className={styles.socialLink}>
              <Icon glyph={SvgInstagram} className={styles.socialIcon} />
            </a>
            <a href="" className={styles.socialLink}>
              <Icon glyph={SvgGithub} className={styles.socialIcon} />
            </a>
            <a href="" className={styles.socialLink}>
              <Icon glyph={SvgLinkedIn} className={styles.socialIcon} />
            </a>
          </div>
        </div>
      </div>
      <p className={styles.copyright}>
        &copy; 2025 Pagepure ltd. Alle Rechte vorbehalten.{" "}
        <a href="">Terms of Use</a> <a href="">Privacy</a>
        Policy
      </p>
    </div>
  </footer>
);

export default Footer;
