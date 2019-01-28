import * as React from "react";
import { HomePage } from "./HomePage";
import { SimpleModel } from "./SimpleModel";

export const Site = ({showSimpleModel, navigateToSimpleModel, isDev, facebookUserSession, onFacebookLoginComplete}) => 
    showSimpleModel 
        ? <SimpleModel /> 
        : <HomePage navigateToSimpleModel={navigateToSimpleModel} isDev={isDev} facebookUserSession={facebookUserSession} onFacebookLoginComplete={onFacebookLoginComplete} />