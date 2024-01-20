import dotenv from "dotenv";
import express from "express";
import dropboxWebhook from "./dropboxWebhook";
import appendRawBody from "./appendRawBody";

// Load environment variables from .env file if present
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(
  express.json({
    verify: appendRawBody as any,
  }),
);
app.use(dropboxWebhook);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
