import { Request, Response, NextFunction } from "express";
import crypto from "crypto";

export default function validateSignature(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const signature = req.headers["x-dropbox-signature"];

  const expectedSignature = crypto
    .createHmac("sha256", process.env.DROPBOX_APP_SECRET as string)
    .update(req.rawBody || "", "utf8")
    .digest("hex");

  if (!signature || signature !== expectedSignature) {
    console.error("Invalid signature. Potential tampering detected.");
    return res.status(403).send("Invalid request signature.");
  }

  console.log("Valid webhook received from Dropbox:", req.body);
  next();
}
