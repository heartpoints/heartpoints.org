import * as React from "react";
import { allStates } from "../models/economy-model";
import ReactDOM from 'react-dom';
import { VictoryBar, VictoryStack, VictoryAxis, VictoryChart } from 'victory';

// const data = [
//     {quarter: 1, earnings: 10},
//     {quarter: 2, earnings: 30},
//     {quarter: 3, earnings: 60},
//     {quarter: 4, earnings: 70}
//   ];

export const Site = () => <div>
    <h1>heartpoints.org Model</h1>
    <p>Model Run Result</p>
    <pre>{JSON.stringify(allStates, null, 3)}</pre>
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