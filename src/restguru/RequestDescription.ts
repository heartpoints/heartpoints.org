import { HttpMethod } from "./HttpMethod";
export interface RequestDescription {
    url: string;
    accept: string[];
    method: HttpMethod;
}
