import { UnitTestDefinition } from "../../testing/UnitTestDefinition";
import { urlFromString } from "./urlFromString";

 // todo: support { Url } to get DRY naming
export const Test:UnitTestDefinition = ({forFunction}) => 
    forFunction(urlFromString)
        .givenParameter("http://www.cnn.com/hey")
            .expect.returnValue.protocol.equals("http")
            .expect.returnValue.path.equals("/hey")
            .expect.returnValue.host.equals("www.cnn.com")
        .givenParameter("https://cnn.com/hey")
            .expect.returnValue.protocol.equals("https")
            .expect.returnValue.path.equals("/hey")
            .expect.returnValue.host.equals("cnn.com")
    .forFunction((n:number) => ({a: 5}))
        .givenParameter(5)
            .expect.returnValue.a.equals(5)
    