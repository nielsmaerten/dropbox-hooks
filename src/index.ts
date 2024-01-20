import express from "express";
import dropboxWebhook from "./dropboxWebhook";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(dropboxWebhook);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
