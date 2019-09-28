import { Request } from "express";

export const urlStringFromExpressRequest = (req: Request) => `${req.protocol}://${req.get('host')}${req.originalUrl}`;
