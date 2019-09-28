import { Url } from "./Url"
import { UnitTestDefinition } from "../../testing/UnitTestDefinition";

 // todo: support { Url } to get DRY naming
export const Test:UnitTestDefinition = ({forFunction}) => 
    forFunction(Url)
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
    