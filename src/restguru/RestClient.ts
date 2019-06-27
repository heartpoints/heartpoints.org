import { theInternet } from "./theInternet";
import { RequestDescription } from "./RequestDescription";
import { HttpResponse } from "./HttpResponse";
import { IRestClient } from "./IRestClient";

export const RestClient = ():IRestClient => ({
    async request(requestDescription:RequestDescription):Promise<HttpResponse> {
        const { url, accept } = requestDescription;
        const contentType = accept[0]
        return theInternet({url, contentType})
    }
})