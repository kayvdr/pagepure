import { parseHTML } from "linkedom";
import { getCleanUrl } from "./utils.js";

export const getFinalUrl = async (rawUrl: string): Promise<string> => {
  const cleanUrl = getCleanUrl(rawUrl);
  const res = await fetch(cleanUrl, {
    method: "GET",
    redirect: "follow",
  });
  return res.url || cleanUrl;
};

export const extractContent = async (url: string) => {
  const res = await fetch(url);
  const html = await res.text();

  const { document } = parseHTML(html);

  const charset =
    document.querySelector("meta[charset]")?.getAttribute("charset") || "utf-8";

  const root =
    document.querySelector("article")?.innerHTML ||
    document.querySelector("main")?.innerHTML ||
    document.body?.innerHTML ||
    "";

  const { document: contentDoc } = parseHTML(root);

  const KlassesAndIds = [
    "footer",
    "ads",
    "banner",
    "popup",
    "cookie",
    "newsletter",
    "breadcrumb",
    "navigation",
    "menu",
    "hidden",
  ];

  const forbidden = [
    "head",
    "script",
    "link",
    "style",
    "noscript",
    "iframe",
    "nav",
    "footer",
    "form",
    "input",
    "svg",
    "img",
    "video",
    "progress",
    ...KlassesAndIds.flatMap((item) => [
      `[class*="${item}"]`,
      `[id*="${item}"]`,
    ]),
  ];

  forbidden.forEach((tag) => {
    contentDoc.querySelectorAll(tag).forEach((el) => el.remove());
  });

  // Schlüsselwörter, die im Tag-Namen enthalten sein dürfen, um ihn zu entfernen
  const forbiddenTagKeywords = ["header", "footer", "sidebar", "widget"];

  // Entferne alle Tags, deren Name eines der Keywords enthält
  contentDoc.querySelectorAll("*").forEach((el) => {
    const tagName = el.tagName.toLowerCase();
    if (
      forbiddenTagKeywords.some((keyword) => tagName.includes(`${keyword}-`))
    ) {
      el.remove();
    }
  });

  // Alle Attribute entfernen
  contentDoc.querySelectorAll("*").forEach((el) => {
    [...el.attributes].forEach((attr) => el.removeAttribute(attr.name));
  });

  const result = contentDoc.toString();

  const plainText = result
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .replace(/\n+/g, "\n")
    .trim();

  return {
    meta: { title: document.title, charset },
    content: {
      html: result,
      plain: plainText,
    },
  };
};
