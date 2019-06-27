import { RequestDescription } from "./RequestDescription";
import { HttpResponse } from "./HttpResponse";

export interface IRestClient {
    request(requestDescription: RequestDescription): Promise<HttpResponse>;
}
