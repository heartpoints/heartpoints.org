import * as React from "react";
import { allStates } from "../models/economy-model";

export const Site = () => <div>
    <h1>heartpoints.org Model</h1>
    <p>Model Run Result</p>
    <pre>{JSON.stringify(allStates, null, 3)}</pre>
</div>

// const Chart = () => <Line
//   width={900}
//   height={400}
//   margin={{
//     top: 20,
//     right: 20,
//     bottom: 60,
//     left: 80
//   }}
//   data={[
//     {id: 'whisky',color: 'hsl(325, 70%, 50%)',data: [
//         {color: 'hsl(133, 70%, 50%)',x: 'GE',y: 58},
//         {color: 'hsl(82, 70%, 50%)',x: 'FK',y: 60},
//         {color: 'hsl(17, 70%, 50%)',x: 'AU',y: 9},
//         …
//       ]},
//     {id: 'rhum',color: 'hsl(213, 70%, 50%)',data: [
//         {color: 'hsl(291, 70%, 50%)',x: 'GE',y: 5},
//         {color: 'hsl(135, 70%, 50%)',x: 'FK',y: 8},
//         {color: 'hsl(168, 70%, 50%)',x: 'AU',y: 41},
//         …
//       ]},
//     {id: 'gin',color: 'hsl(301, 70%, 50%)',data: [
//         {color: 'hsl(123, 70%, 50%)',x: 'GE',y: 29},
//         {color: 'hsl(81, 70%, 50%)',x: 'FK',y: 47},
//         {color: 'hsl(303, 70%, 50%)',x: 'AU',y: 21},
//         …
//       ]},
//     {id: 'vodka',color: 'hsl(82, 70%, 50%)',data: [
//         {color: 'hsl(18, 70%, 50%)',x: 'GE',y: 36},
//         {color: 'hsl(352, 70%, 50%)',x: 'FK',y: 35},
//         {color: 'hsl(160, 70%, 50%)',x: 'AU',y: 27},
//         …
//       ]},
//     {id: 'cognac',color: 'hsl(63, 70%, 50%)',data: [
//         {color: 'hsl(194, 70%, 50%)',x: 'GE',y: 55},
//         {color: 'hsl(130, 70%, 50%)',x: 'FK',y: 7},
//         {color: 'hsl(147, 70%, 50%)',x: 'AU',y: 18},
//         …
//       ]}
//   ]}
//   animate
//   yScale={{type: 'linear',stacked: true}}
//   curve="monotoneX"
// />