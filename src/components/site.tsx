import * as React from "react";
import { HomePage, FacebookStuff } from "./HomePage";
import { SimpleModel } from "./SimpleModel";

export const Site = (props) => {
    const {showSimpleModel, currentUrl } = props;
    const showLogin = currentUrl.indexOf("#login") > -1
    return showSimpleModel 
        ? <SimpleModel /> 
        : showLogin
            ? <FacebookStuff {...props} />
            : <HomePage {...props} />
}