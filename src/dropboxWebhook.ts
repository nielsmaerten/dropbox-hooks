import express from "express";
import axios from "axios";

import validateSignature from "./validateSignature";

const router = express.Router();

router.get("/dropbox-webhook", (req, res) => {
  // Respond to the challenge
  const challenge = req.query.challenge;
  res.send(challenge);
});

router.post("/dropbox-webhook", validateSignature, async (req, res) => {
  console.log("Received webhook from Dropbox:", req.body);

  // Respond quickly to the webhook request to acknowledge receipt
  res.status(200).end();
});

export default router;
