import { JSONValue } from "../json/JSONValue";
import { log } from "./log";
import { jsonString } from "../strings/jsonString";

export const logJson = (value:JSONValue) => log(jsonString(value))