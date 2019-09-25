import { ImmutableRequest } from "../immutableRequest/immutableRequest"
import { Response } from "express";

export type Middleware = (req:ImmutableRequest, res:Response, next:VoidFunction) => any