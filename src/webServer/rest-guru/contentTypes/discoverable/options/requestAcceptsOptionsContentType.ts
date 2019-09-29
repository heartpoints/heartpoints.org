import { Request } from "express";
import { httpOptionsContentTypeString } from "./httpOptionsContentTypeString";

export const requestAcceptsOptionsContentType = (req: Request) => req.headers.accept && req.headers.accept.includes(httpOptionsContentTypeString);
