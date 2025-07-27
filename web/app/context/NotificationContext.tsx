import { createContext, ReactNode, useContext, useState } from "react";

export type NotificationType = "success" | "error" | "info";

interface Notification {
  id: number;
  message: string;
  type: NotificationType;
}

interface NotificationContextValue {
  addNotification: (message: string, type?: NotificationType) => void;
  removeNotification: (id: number) => void;
  notifications: Notification[];
}

const NotificationContext = createContext<NotificationContextValue | undefined>(
  undefined
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (
    message: string,
    type: NotificationType = "info"
  ) => {
    const newNotification: Notification = {
      id: Date.now(),
      message,
      type,
    };
    setNotifications((prev) => [...prev, newNotification]);

    // Automatisch nach 5 Sekunden entfernen
    setTimeout(() => removeNotification(newNotification.id), 5000);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{ addNotification, removeNotification, notifications }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }
  return context;
};
