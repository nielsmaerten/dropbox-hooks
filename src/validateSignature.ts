import { Request, Response, NextFunction } from "express";
import crypto from "crypto";

export default function validateSignature(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const signature = req.headers["x-dropbox-signature"];
  if (!signature) {
    return res.status(400).send("No signature header found on request");
  }
  const requestBody = JSON.stringify(req.body);

  const hmac = crypto.createHmac(
    "sha256",
    process.env.DROPBOX_APP_SECRET as string,
  );
  hmac.update(requestBody, "utf8");
  const digest = hmac.digest("hex");

  if (signature !== digest) {
    return res.status(403).send("Signature mismatch");
  }

  next();
}
