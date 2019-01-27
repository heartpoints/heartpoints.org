import * as React from "react";
import { HomePage } from "./HomePage";
import { SimpleModel } from "./SimpleModel";

export const Site = ({showSimpleModel, navigateToSimpleModel, isDev}) => 
    showSimpleModel 
        ? <SimpleModel /> 
        : <HomePage navigateToSimpleModel={navigateToSimpleModel} isDev={isDev} />