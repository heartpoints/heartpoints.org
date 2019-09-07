contentTypes resource
---------------------

This describes the contentTypes resource that would list a series of content types themselves, such as might be returned
in the body of an OPTIONS call to some resource URL:

/rest.guru/contentTypes/

OPTIONS
RESPONSE BODY:
{
    "Content-Types": [
        "text/plain",
        "text/markdown",
        "text/html",
        "application/rest.guru;href=http://rest.guru/contentTypes/text/plain",
        "application/rest.guru;href=http://rest.guru/contentTypes/text/html",
    ]
}

GET
ACCEPT: "text/plain"
RESPONSE BODY: This is a list of the content types that are built into the rest.guru system, and any that were added after that. There
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

        "application/rest.guru;href=http://rest.guru/contentTypes/text/plain"
        "application/rest.guru;href=http://rest.guru/contentTypes/text/html"
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
        "application/rest.guru;href=http://rest.guru/contentTypes/text/plain",
        "application/rest.guru;href=http://rest.guru/contentTypes/text/html",
        "application/rest.guru;href=http://anyOtherURLForALogicalTypeThatIsRESTfullyDiscoverable"
    ]
}