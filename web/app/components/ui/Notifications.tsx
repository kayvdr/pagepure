import classNames from "classnames";
import { useNotification } from "~/context/NotificationContext";
import SvgClose from "../icons/Close";
import Icon from "./Icon";
import styles from "./Notifications.module.css";

const Notifications = () => {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className={styles.notificationsContainer}>
      {notifications.map((n) => (
        <div
          key={n.id}
          className={classNames(styles.notification, styles.success)}
        >
          {n.message}
          <button
            className={styles.closeButton}
            onClick={() => {
              removeNotification(n.id);
            }}
          >
            <Icon glyph={SvgClose} className={styles.closeIcon} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
