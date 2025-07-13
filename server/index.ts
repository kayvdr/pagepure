import cors from "cors";
import express from "express";
import { extractContent, getFinalUrl } from "./src/content.js";
import { isValidUrl } from "./src/utils.js";

const app = express();
const PORT = 9001;

const corsOptions = {
  origin: ["http://localhost:9002", "https://domain.com"],
};

app.use(cors(corsOptions));

app.get("/api/v1/test", (req, res) => {
  res.json({ running: 1 });
});

app.get("/api/v1/content", async (req, res) => {
  const rawUrl = req.query.url as string;

  if (!rawUrl) return res.status(400).json({ error: "Missing 'url' field" });
  if (!isValidUrl(rawUrl))
    return res.status(400).json({ error: "'url' not valid" });

  try {
    const finalUrl = await getFinalUrl(rawUrl);
    const content = await extractContent(finalUrl);
    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to extract content" });
  }
});

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});
