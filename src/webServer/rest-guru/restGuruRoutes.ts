import { Application, Request } from "express";
import { restGuruGet } from "./restGuruGet";
import { contentTypeURLBase } from "./contentTypeURLBase";
import { niceInterfaceForRestGuruRootURL } from "./niceInterfaceForRestGuruRootURL";
import { jsonString } from "../../utils/strings/jsonString";

const newLine = "\n"
const tab = "\t"
const restGuruTypePrefix = `text/rest.guru;href=`
const restGuruContentTypeString = contentTypeURL => `${restGuruTypePrefix}${contentTypeURL}`
const httpOptionsContentTypeURL = `${contentTypeURLBase}http/options`
const httpOptionsContentTypeString = restGuruContentTypeString(httpOptionsContentTypeURL)

const htmlType = "text/html"
const plainTextType = "text/plain"
const niceInterfaceForRestGuruRootResource = restGuruContentTypeString(niceInterfaceForRestGuruRootURL)
const basicTypes = [htmlType,plainTextType]
const responseAsOptionsJSON = [...basicTypes,niceInterfaceForRestGuruRootResource]
const optionsAcceptableTypes = [...basicTypes,httpOptionsContentTypeString]
const responseAsOptionsJSONString = jsonString(responseAsOptionsJSON)

const acceptPreText = 
`ACCEPT:
The client may request the following content types in the Accept header:`

const bulletify = arrayOfStrings => arrayOfStrings.map(s => `- ${s}`).join(newLine)
const tabForward = (textToTab:string) => textToTab.split(newLine).map(t => `${tab}${t}`).join(newLine)

const getHeadersPlainText =
`${acceptPreText}
${bulletify(responseAsOptionsJSON)}`

const optionsHeadersPlainText =
`${acceptPreText}
${bulletify(optionsAcceptableTypes)}`


const responseAsOptionsPlainText =
`The following options are available for this resource:

GET:
When performing a GET, the client may specify the following headers:

${tabForward(getHeadersPlainText)}

OPTIONS:
When performing an OPTIONS request, the client may specify the following headers:

${tabForward(optionsHeadersPlainText)}`

const requestAcceptsOptionsContentType = 
    (req:Request) => 
    req.headers.accept && req.headers.accept.includes(httpOptionsContentTypeString)

const responseText = 
    req => 
    requestAcceptsOptionsContentType(req) 
        ? responseAsOptionsJSONString 
        : responseAsOptionsPlainText

export const restGuruRoutes =
    (expressApp:Application) => {
        expressApp.options("/rest-guru", (req, res, next) => res.send(responseText(req)))
        expressApp.get("/rest-guru", restGuruGet)
    }