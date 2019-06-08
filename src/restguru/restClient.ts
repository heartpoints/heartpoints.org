import { theInternet } from "./theInternet";

export interface RestClient {
    request(requestDescription:RequestDescription):Promise<HttpResponse>
}

export interface HttpResponse {
    
}

export interface RequestDescription {
    url:string,
    accept:string[],
    method:HttpMethod
}

export enum HttpMethod {
    POST = "POST",
    GET = "GET",
    PUT = "PUT",
    OPTIONS = "OPTIONS",
}

export const restClient = ():RestClient => ({
    async request(requestDescription:RequestDescription):Promise<HttpResponse> {
        const { url, accept } = requestDescription;
        const contentType = accept[0]
        return theInternet({url, contentType})
    }
})