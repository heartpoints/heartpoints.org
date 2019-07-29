import * as React from "react";
import { Paper } from "@material-ui/core";

export const Page = ({children}) => 
    <div style={{marginTop: "60px"}}>
        <Paper style={{padding: "15px"}}>
            {children}
        </Paper>
    </div>