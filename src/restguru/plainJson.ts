export type JSONValue = string | number | null | boolean | JSONObject | JSONArray;

export interface JSONObject {
    [x: string]: JSONValue;
}

export interface JSONArray extends Array<JSONValue> {}