import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Gugi&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap",
  },
  {
    rel: "icon",
    type: "image/png",
    href: "/favicon-96x96.png",
    sizes: "96x96",
  },
  {
    rel: "icon",
    type: "image/svg+xml",
    href: "/favicon.svg",
    sizes: "96x96",
  },
  {
    rel: "shortcut icon",
    href: "/favicon.ico",
  },
  {
    rel: "apple-touch-icon",
    type: "image/svg+xml",
    href: "/apple-touch-icon.png",
    sizes: "180x180",
  },
  {
    rel: "manifest",
    href: "/site.webmanifest",
  },
  { rel: "stylesheet", href: "/app/styles/global.css" },
];

export const Layout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Meta />
      <Links />
    </head>
    <body>
      {children}
      <ScrollRestoration />
      <Scripts />
    </body>
  </html>
);

const App = () => <Outlet />;

export default App;
