import * as React from "react";
import { allStates } from "../models/economy-model";

export const Site = () => <div>
    <h1>heartpoints.org Model</h1>
    <p>Model Run Result</p>
    <pre>{JSON.stringify(allStates, null, 3)}</pre>
</div>