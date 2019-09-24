import { theInternet } from "./theInternet";
import { RGSONArray } from "./rgson";
import { JSONArray } from "../utils/json/JSONArray";

export const mapArrayToCompleteProjection = 
    (arrayRepresentation: RGSONArray): JSONArray => 
    arrayRepresentation.map(
        url => theInternet({ 
            url,
            contentType: "http://rest.guru/rgson/completeProjection" 
        }).value
    )
