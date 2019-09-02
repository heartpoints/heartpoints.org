import * as React from "react"
import { Page } from "../page/Page";

// type A = number
interface A {
    a: number
}
export default A

export const RestGuru = () => <Page>
    <h1>rest.guru</h1>
    
    {/* 
        /rest.guru

            OPTIONS
            If this is being called, its because a programmer or program is calling it. They want a list of allowed values for the
            ACCEPTS header of the resource.

            For simplicity, let us assume that what comes back is literally a json array of allowed values, some of which may be
            hyperContentTypes (content type strings whose identifiers themselves contain a URL) and classical content types.

            Example: 
            {
                "Content-Types": [
                    "text/plain",
                    "text/markdown",
                    "text/html",
                    ...
                ]
            }

            GET
            ACCEPTS: "text/plain"
            BODY: the plain text of the restguru readme file

            GET
            ACCEPTS: "text/markdown"
            BODY: same as plain text, but smarter browsers can render better since they know more about the data

            GET
            ACCEPTS: "text/html"
            BODY: <react app />
            Description:
                Internal Address Bar shows the url of current resource (in this case /restguru itself)
                Dropdown shows the Content Types available (for now, just literally show them)
                Picking a Content Type narrows the list of available VIEWS for the given content type (currently hardcoded)
                Views should include:
                    Preformatted plain text (courier <pre /> block)
                    Preformatted with links (same as above, but links detected and made easier to click)
                    Markdown Viewer (find a smart react markdown viewer and reuse it)
                    Full Site Viewer (way to nest an entire root html page within the current site, should be able to arbitrarily nest rest.guru html views)
                Selecting a view causes the REPRESENTATION to be retrieved, in its appropriate content type

            GET
            ACCEPTS: "text/html/serverRendered"
            BODY: <plain html without javascript that looks like a simple nice view, in this case maybe do an html version of the markdown
                but render it server side so its just boring html and style by the time the body comes back to the client>

        
        /rest.guru/contentTypes/
        
            OPTIONS
            {
                "Content-Types": [
                    "text/plain",
                    "text/markdown",
                    "text/html",
                    "application/rest.guru;href=http://[currentURL]/rest.guru/contentTypes/text/plain",
                    "application/rest.guru;href=http://[currentURL]/rest.guru/contentTypes/text/html",
                ]
            }
        
            GET
            ACCEPT: "text/plain"
            BODY: This is a list of the content types that are built into the rest.guru system, and any that were added after that. There
                are two classes of content types - those whose identifier is a traditional mime type string; and a subset of those
                whose initial prefix is application/rest.guru, which always contain, if nothing else, an href key value pair, where
                the href portion serves to further identify a "rest.guru compatible" content type.

                For each of the common classical content types, there is a "rest.guru compatible wrapper". Types that are more precise, flexible,
                and have the capabilities of the rest.guru system, are also among this subset, those these types need not be built in.

                Classical Content Types:

                    "text/plain"
                    "text/markdown"
                    "text/html"

                rest.guru hypercontenttypes:

                    "application/rest.guru;href=http://[currentURL]/rest.guru/contentTypes/text/plain"
                    "application/rest.guru;href=http://[currentURL]/rest.guru/contentTypes/text/html"
                    "application/rest.guru;href=http://anyOtherURLForALogicalTypeThatIsRESTfullyDiscoverable"

            GET
            ACCEPT: "application/json"
            BODY: {
                "classicalContentTypes": [
                    "text/plain",
                    "text/markdown",
                    "text/html",
                ],
                "hypercontenttypes: [
                    "application/rest.guru;href=http://[currentURL]/rest.guru/contentTypes/text/plain",
                    "application/rest.guru;href=http://[currentURL]/rest.guru/contentTypes/text/html",
                    "application/rest.guru;href=http://anyOtherURLForALogicalTypeThatIsRESTfullyDiscoverable"
                ]
            }

        /rest.guru/contentTypes/[any hypercontenttype for the built in types]

            OPTIONS
            {
                "Content-Types": [
                    "text/plain",
                    "text/markdown",
                    "text/html",
                    "application/rest.guru;href=http://[currentURL]/rest.guru/contentTypes/text/plain",
                    "application/rest.guru;href=http://[currentURL]/rest.guru/contentTypes/text/html",
                ]
            }

            GET
            ACCEPTS: text/plain
            BODY: A plain text description of the text/plain content type, with links to wikipedia.


        /rest.guru/contentTypes/t298edsiuhfisudfhs

            OPTIONS
            {
                "Content-Types": [
                    "text/plain",
                    "text/markdown",
                    "text/html",
                    "application/rest.guru;href=http://[currentURL]/rest.guru/contentTypes/text/plain",
                    "application/rest.guru;href=http://[currentURL]/rest.guru/contentTypes/text/html",
                    "application/rest.guru;href=http://[currentURL]/rest.guru/contentTypes/person",
                ]
            }

            GET
            ACCEPTS: text/plain
            BODY: THe plain text description of this custom content type, which is not a basic wrapper, but something more
            precise - say like a typescript interface that is compatible with JSON itself. Not necessarily code, but not necessarily
            *not* code.

            GET
            ACCEPTS: application/rest.guru;href=https://typescript.org/v14
            BODY: This content type is too ambiguous because it just says that theres a typescript representation coming back;
            lets say instead we want the resource to export a single default which is something that could appear on the right
            hand side of a type assignment. Example:

                import t298edsiuhfisudfhs from ""

    */}

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