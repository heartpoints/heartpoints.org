import { tabForward } from "../../../../../utils/strings/tabForward";
import { optionsHeadersPlainText } from "./optionsHeadersPlainText";

export const responseAsOptionsPlainText = (resourceGetContentTypes:string) => `The following options are available for this resource:

GET:
When performing a GET, the client may specify the following headers:

${tabForward(resourceGetContentTypes)}

OPTIONS:
When performing an OPTIONS request, the client may specify the following headers:

${tabForward(optionsHeadersPlainText)}`;
