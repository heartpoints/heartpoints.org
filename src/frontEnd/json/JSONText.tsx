import * as React from "react";
import { JSONValue } from "../../utils/json/JSONValue";

export const JSONText = (json:JSONValue) => <pre>{JSON.stringify(json, null, 3)}</pre>