type JSONValue = string | number | null | boolean | JSONObject | JSONArray;

interface JSONObject {
    [x: string]: JSONValue;
}

interface JSONArray extends Array<JSONValue> { }