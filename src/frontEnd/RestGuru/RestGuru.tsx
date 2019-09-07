import * as React from "react"
import { Page } from "../page/Page";

// type A = number
interface A {
    a: number
}
export default A

export const RestGuru = () => <Page>
    <h1>rest.guru</h1>

    <select>
        <option>text/plain</option>
        <option>browser native</option>
        <option>React Markdown</option>
        <option>HTML (derived from markdown)</option>
    </select>

    <ul>
        <li><a href="http://cnn.com" media="text/html">cnn html</a></li>
        <li><a href="http://cnn.com" media="application/json">cnn json</a></li>
        <li><a href="http://cnn.com" media="text/plain">cnn text</a></li>
    </ul>
    <p>Here we will display the plain text or a fancy readme version of restguru home page</p>
</Page>