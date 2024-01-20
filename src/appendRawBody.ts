import { Request, Response } from "express";

declare module "express-serve-static-core" {
  interface Request {
    rawBody?: string;
  }
}

// Adds the string value of the raw body to req.rawBody
// This will later be used to validate the signature
export default function appendRawBody(
  req: Request,
  res: Response,
  buf: Buffer,
  encoding?: BufferEncoding,
) {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || "utf8");
  }
}
