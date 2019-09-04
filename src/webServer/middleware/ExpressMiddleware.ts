import { Response, NextFunction, Request } from "express";

export type ExpressMiddleware = (request: Request, response: Response, next: NextFunction) => void;
