import express from "express";

const router = express.Router();

router.get("/dropbox-webhook", (req, res) => {
  // Respond to the challenge
  const challenge = req.query.challenge;
  res.send(challenge);
});

router.post("/dropbox-webhook", (req, res) => {
  // Handle webhook notification
  console.log("Received webhook from Dropbox:", req.body);
  // Respond quickly to the webhook request
  res.status(200).end();
});

export default router;
