import { createRequestHandler } from "@remix-run/express";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));

app.all(
  "*",
  createRequestHandler({
    build: await import("../build/server/index.js"),
    mode: process.env.NODE_ENV,
  })
);

app.listen(port, () => {
  console.log(`✅ Remix SSR server running at http://localhost:${port}`);
});
