Rest Guru Root Resource - WIP
-----------------------------

NOTE: Work in progress

This is a readme for how the root resource of the http://rest.guru web service should behave. Ideally, tests and/or
the product (the rest.guru viewer) should render this readme unnecessary (it should be generatable from the runtime itself)

OPTIONS
If this is being called, its because a programmer or program is calling it. They may want, among other things, a list of allowed values for the
ACCEPTS header of the resource.

For simplicity, let us assume that what comes back is literally a json array of allowed values, some of which may be
hyperContentTypes (content type strings whose identifiers themselves contain a URL) and classical content types.

Example: 
{
    "Content-Types": [
        "text/plain",
        "text/markdown",
        "text/html",
        "http://rest.guru/contentTypes/text/plain", //here is what we are calling a "hypercontenttype"
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