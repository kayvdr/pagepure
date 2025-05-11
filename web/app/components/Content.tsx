import styles from "./Content.module.css";

const Content = () => {
  return (
    <div className={styles.content}>
      <h1 className={styles.title}>
        <span className={styles.textPurple}>Simplify the Web</span> –<br />{" "}
        Clean, Pure, and Untracked
      </h1>
      <p>
        Pagepure transforms messy, redirected, and tracking-heavy links into
        clean, readable destinations. Preview titles, remove tracking
        parameters, and extract the pure content of any page – perfect for
        marketers, journalists, and privacy-conscious users.
      </p>
    </div>
  );
};

export default Content;
