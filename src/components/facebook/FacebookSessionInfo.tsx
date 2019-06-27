import * as React from "react";
import { Typography } from "@material-ui/core";
import { jsonString } from "../../utils/strings/jsonString";

export const FacebookSessionInfo = ({facebookUserSession}) => <div>
    <Typography variant="h6" color="inherit">
        Facebook Session Info
    </Typography>
    <pre>
        {jsonString(facebookUserSession)}
    </pre>
</div>