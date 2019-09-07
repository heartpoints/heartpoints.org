A given content type resource - WIP
-----------------------------------

NOTE: Work in progress

Imagine there is "some type" out there, a format that other resources can be represented by. This type has a URL to distinguish it from other types. By
requesting a resource at SOME URL, and sending the URL of "some type" in the ACCEPT header of that call, the resource should be sent back in a format that
embodies the format of "some type".

/rest.guru/contentTypes/SomeType

OPTIONS
{
    "Content-Types": [
        "text/plain",
        "text/markdown",
        "text/html",
        "application/rest.guru;href=http://rest.guru/contentTypes/text/plain",
        "application/rest.guru;href=http://rest.guru/contentTypes/text/html",
        "application/rest.guru;href=http://rest.guru/contentTypes/typescript,
    ]
}

GET http://rest.guru/contentTypes/typescript
ACCEPTS: text/plain
BODY: The plain text description of this custom content type, which is not a basic wrapper, but something more
precise - say like a typescript interface that is compatible with JSON itself. Not necessarily code, but not necessarily
*not* code.

GET /rest.guru/contentTypes/SomeType
ACCEPTS: application/rest.guru;href=http://rest.guru/contentTypes/typescript/export/default;etag=v2.1.1
BODY: [Returns a typescript module with a single default export whose value is a value allowed to appear on the
      right hand side of a typescript "type X = ____" expression. This then describes the type.]


# Requesting a resource using a specific type, in a specific language

Given we know what a logical type is, and that we can see it as a typescript type, java type, or other type, including
different language versions of that type, how do we then go back and request the original resource of interest, represented
as one of those specific types, given that the resource only referred to a more general notion of one of its available
types in its OPTIONS response?

OPTIONS /tommy
RESPONSE BODY: {
    "Content-Types": [
        "text/plain",
        "http://rest.guru/contentTypes/Person"
    ]
}

OPTIONS http://rest.guru/contentTypes/Person
RESPONSE BODY: {
    "Content-Types": [
        http://rest.guru/contentTypes/typescript
    ]
}

OPTIONS http://rest.guru/contentTypes/typescript
RESPONSE BODY: {
    "Content-Types": [
        "text/plain"
    ]
}

GET http://rest.guru/contentTypes/typescript
ACCEPT: text/plain
RESPONSE BODY:
    When used in the Accepts header of a type resource request, "http://rest.guru/contentTypes/typescript" causes the
    server to return a typescript definition of that type.

GET http://rest.guru/contentTypes/Person
ACCEPT: application/typescript;href=http://rest.guru/contentTypes/typescript
RESPONSE BODY:
    export default type Person = {
        firstName: string,
        lastName: string,
    }

GET /tommy
ACCEPT: application/json;href=http://rest.guru/contentTypes/Person;typesystem=http://rest.guru/contentTypes/typescript
RESPONSE BODY: 
    Here we have not been precise in asking for a JSON, just a generic person type, so what should we return?
