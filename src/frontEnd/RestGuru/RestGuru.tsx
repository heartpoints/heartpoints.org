import * as React from "react"
import { Page } from "../page/Page";
import { Card, Typography } from "@material-ui/core";

const CardPadded = (props) => <Card {...props} style={{padding: "15px", marginBottom: "15px", ...props.style}} />

export const RestGuru = () => <Page>
    <h1>rest.guru</h1>

    <CardPadded>
        <h5>Embedded HTTP Requestor</h5>

        <h3>NOTE: Incomplete! This is a WIP</h3>

        <p>
            <label>URL: </label>
            <input style={{width: 500 }} type="text" value={window.location.href} /></p>

        <p>
            <label>Method: </label>
            <select>
                <option>GET</option>
                <option>OPTIONS</option>
            </select>
        </p>

        <p>
            <label>Accepted Content Type(s): </label>
            <select>
                <option>text/plain</option>
                <option>browser native</option>
                <option>React Markdown</option>
                <option>HTML (derived from markdown)</option>
            </select>
        </p>
    </CardPadded>
    
    <CardPadded>
        <h5>Representation</h5>
        <textarea style={{width: "500px", height: "200px"}}>
            Here we would see a representation of the resource, based on the browser's ability to figure out how to render
            that resource, which it may do by looking up content types related to the data content type that it in turn knows
            how to render.
        </textarea>
    </CardPadded>
</Page>