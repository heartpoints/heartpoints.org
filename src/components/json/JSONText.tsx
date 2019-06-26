import * as React from "react";
import { JSONValue } from "../../restguru/JSONValue";

export const JSONText = (json:JSONValue) => <pre>{JSON.stringify(json, null, 3)}</pre>