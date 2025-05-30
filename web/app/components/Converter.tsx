import classNames from "classnames";
import { useEffect, useState } from "react";
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
  const [url, setUrl] = useState<string | undefined>(undefined);
  const [data, setData] = useState<Data | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ input: boolean; fetch: boolean }>({
    input: false,
    fetch: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!url || !isURL(url)) {
      setError({ ...error, input: true });
      setLoading(false);
      return;
    }

    const response = await fetch("http://localhost:9001/api/v1/content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

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
    [url]
  );

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div
          className={classNames(styles.inputField, {
            [styles.error]: error.input,
          })}
        >
          <input
            type="text"
            className={styles.input}
            placeholder="Bsp: https://www.news.com/article/this-is-a-news-article"
            onChange={(e) => setUrl(e.target.value)}
          />
          <button type="submit" className={styles.submit}>
            Unwrap
          </button>
        </div>
      </form>
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
                  onClick={async () =>
                    await navigator.clipboard.writeText(data.content.plain)
                  }
                >
                  <Icon glyph={SvgCopy} className={styles.actionIcon} />
                  Copy
                </button>
                <button
                  className={styles.actionButton}
                  onClick={async () => {
                    // await navigator.share({
                    //   text: data.content.,
                    // });
                  }}
                >
                  <Icon glyph={SvgShare} className={styles.actionIcon} />
                  Share
                </button>
                <button className={styles.actionButton}>
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
