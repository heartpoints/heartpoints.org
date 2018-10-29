import * as React from "react";
import { ResponsiveStream } from '@nivo/stream'

const data = [
    {
      "Raoul": 150,
      "Josiane": 27,
      "Marcel": 90,
      "René": 175,
      "Paul": 164,
      "Jacques": 44
    },
    {
      "Raoul": 20,
      "Josiane": 137,
      "Marcel": 18,
      "René": 132,
      "Paul": 189,
      "Jacques": 175
    },
];

export const NivoChart = () => <ResponsiveStream
data={data}
keys={[
    "Raoul",
    "Josiane",
    "Marcel",
    "René",
    "Paul",
    "Jacques"
]}
margin={{
    "top": 50,
    "right": 110,
    "bottom": 50,
    "left": 60
}}
axisBottom={{
    "orient": "bottom",
    "tickSize": 5,
    "tickPadding": 5,
    "tickRotation": 0,
    "legend": "",
    "legendOffset": 36
}}
axisLeft={{
    "orient": "left",
    "tickSize": 5,
    "tickPadding": 5,
    "tickRotation": 0,
    "legend": "",
    "legendOffset": -40
}}
offsetType="none"
fillOpacity={0.85}
borderColor="#000"
defs={[
    {
        "id": "dots",
        "type": "patternDots",
        "background": "inherit",
        "color": "#2c998f",
        "size": 4,
        "padding": 2,
        "stagger": true
    },
    {
        "id": "squares",
        "type": "patternSquares",
        "background": "inherit",
        "color": "#e4c912",
        "size": 6,
        "padding": 2,
        "stagger": true
    }
]}
fill={[
    {
        "match": {
            "id": "Paul"
        },
        "id": "dots"
    },
    {
        "match": {
            "id": "Marcel"
        },
        "id": "squares"
    }
]}
animate={true}
motionStiffness={90}
motionDamping={15}
legends={[
    {
        "anchor": "bottom-right",
        "direction": "column",
        "translateX": 100,
        "itemWidth": 80,
        "itemHeight": 20,
        "itemTextColor": "#999",
        "symbolSize": 12,
        "symbolShape": "circle",
        "effects": [
            {
                "on": "hover",
                "style": {
                    "itemTextColor": "#000"
                }
            }
        ]
    }
]}
/>