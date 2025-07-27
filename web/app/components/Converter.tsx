import classNames from "classnames";
import { useEffect, useState } from "react";
import { useNotification } from "~/context/NotificationContext";
import styles from "./Converter.module.css";
import SvgCopy from "./icons/Copy";
import SvgLink from "./icons/Link";
import SvgLogo from "./icons/Logo";
import SvgShare from "./icons/Share";
import Icon from "./ui/Icon";

interface Data {
  content: {
    html: string;
    plain: string;
  };
  meta: {
    charset: "ASCII" | "ANSI" | "ISO-8859-1" | "UTF-8";
    title: string;
  };
}

const isURL = (url: string) => {
  const pattern = new RegExp(
    "^([a-zA-Z]+:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$", // fragment locator
    "i"
  );
  return pattern.test(url);
};

const Converter = () => {
  const { addNotification } = useNotification();
  const [value, setValue] = useState("");
  const [data, setData] = useState<Data | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ input: boolean; fetch: boolean }>({
    input: false,
    fetch: false,
  });

  const handleSubmit = async () => {
    setLoading(true);

    if (!value || !isURL(value)) {
      setError({ ...error, input: true });
      setLoading(false);
      return;
    }

    const newURL = new URL(`${import.meta.env.VITE_API_URL}/api/v1/content`);
    newURL.searchParams.append("url", value);

    const searchParams = new URLSearchParams(location.search);
    searchParams.set("value", value);
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}?${searchParams.toString()}`
    );

    const response = await fetch(newURL);

    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
      setLoading(false);
      setError({ ...error, fetch: true });
      return;
    }

    const responseJSON = await response.json();

    setData(responseJSON);
    setLoading(false);
  };

  useEffect(
    () =>
      setError({
        input: false,
        fetch: false,
      }),
    [value]
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const rawValue = searchParams.get("value");
    rawValue && setValue(rawValue);
  }, []);

  return (
    <div>
      <div className={styles.form}>
        <div
          className={classNames(styles.inputField, {
            [styles.error]: error.input,
          })}
        >
          <input
            type="text"
            className={styles.input}
            placeholder="Bsp: https://www.news.com/article/this-is-a-news-article"
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <button
            type="submit"
            className={styles.submit}
            onClick={handleSubmit}
          >
            Unwrap
          </button>
        </div>
      </div>
      <div className={styles.result}>
        <div
          className={classNames(styles.wrapper, {
            [styles.center]: !data || loading,
          })}
        >
          {!data && !loading && (
            <>
              <Icon
                glyph={SvgLogo}
                className={classNames(styles.logo, {
                  [styles.logoRed]: error.fetch,
                })}
              />
              <p>
                {!error.fetch ? (
                  <>
                    Your clean and readable content will appear here after
                    unrolling the link.
                  </>
                ) : (
                  <>
                    Oops! We couldn’t load the content. Please refresh the page
                    or try again in a moment.
                  </>
                )}
              </p>
            </>
          )}
          {loading && (
            <Icon
              glyph={SvgLogo}
              className={classNames(styles.logo, styles.animate)}
            />
          )}
          {data && !loading && !error.fetch && (
            <>
              <div className={styles.action}>
                <button
                  className={styles.actionButton}
                  onClick={async () => {
                    await navigator.clipboard.writeText(data.content.plain);
                    addNotification("Copied to clipboard");
                  }}
                >
                  <Icon glyph={SvgCopy} className={styles.actionIcon} />
                  Copy
                </button>
                <button
                  className={styles.actionButton}
                  onClick={async () => {
                    await navigator.share({ text: data.content.plain });
                  }}
                >
                  <Icon glyph={SvgShare} className={styles.actionIcon} />
                  Share
                </button>
                <button
                  className={styles.actionButton}
                  onClick={async () => {
                    await navigator.clipboard.writeText(location.href);
                    addNotification("Copied to clipboard");
                  }}
                >
                  <Icon glyph={SvgLink} className={styles.actionIcon} />
                  Link
                </button>
              </div>
              {/* TODO: Make this better with library */}
              <div
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: data.content.html }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Converter;
