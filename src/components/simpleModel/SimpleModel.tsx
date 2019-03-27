import * as React from "react";
import { VictoryBar, VictoryStack, VictoryChart } from 'victory';
import { allStates } from "../../models/economy-model";
import { jsonString } from "../../utils/jsonString";

export const SimpleModel = () => <div>
<h1>heartpoints.org Model</h1>
<p>Model Run Result</p>
<pre>{jsonString(allStates)}</pre>
<VictoryChart>
    <VictoryStack>
        <VictoryBar
            data={allStates}
            x="timestep"
            y="people[0].balance"
        />
        <VictoryBar
            data={allStates}
            x="timestep"
            y="people[1].balance"
        />
        <VictoryBar
            data={allStates}
            x="timestep"
            y="people[2].balance"
        />
    </VictoryStack>
  </VictoryChart>
</div>