import * as React from "react";
import { Typography } from "@material-ui/core";

export const FacebookSessionInfo = ({facebookUserSession}) => <div>
    <Typography variant="h6" color="inherit">
        Facebook Session Info
    </Typography>
    <pre>
        {JSON.stringify(facebookUserSession, null, 3)}
    </pre>
</div>