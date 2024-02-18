import express from "express";

import validateSignature from "./validateSignature";
import onDropboxEvent from "./onDropboxEvent";

const router = express.Router();

router.get("/dropbox-webhook", (req, res) => {
  // Respond to the challenge
  const challenge = req.query.challenge;
  res.send(challenge);
});

router.post("/dropbox-webhook", validateSignature, async (req, res) => {
  // Respond quickly to the webhook request to acknowledge receipt
  res.status(200).end();

  // Call the main event handler
  await onDropboxEvent(req.body);
});

export default router;
