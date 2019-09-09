rest.guru
---------

RestGuru is an attempt at creating a language agnostic, and even language version agnostic,
fully discoverable, dynamic type system for the web of resource representations.

Key Concepts:

- Immutable Resources: Resource does not change over time, though new, equivalent formats may be introduced for the same, unchanging resource over time.
    The SHA of the representation content is returned in the ETAG header and thought of as a version identifier that is different for different
    representations. Ideally the URL itself contains such a sha; in this way, a single URL can be retrieved and another party can verify that the SHA of the
    returned representation matches the SHA in the identity of the resource's URL, so that if it is altered, any references to the URL would be able to 
    detect that by checking the SHA and noticing a difference. Alternatively / in addition to, the ETAG header can serve the same purpose, and then clients 
    must store both the URL and the ETAG (as well as verify the latter)
- Mutable Resources: A resource that can present as a redirect to a specific immutable resource that represents it at some instant in time, perhaps
    redirecting to a different one at a later moment, and then again at a later moment. Ideally, the history of a mutable resource is determinable, by
    viewing a graph of URLs pointing back to the past. This could take the form of a simple array of URLs, or may take more of a git commit tree like form.
    We could even emulate superpositions of mutable resources by having the client refer to a specific worldline or set thereof, in which it is considering
    the resource's value, and the version returned then depends on the circumstance of the call
- Discoverable, Dynamic Content Types: Rather than predefined or plain string content types, the content type shall itself be a URL, and then a client can
    use an OPTIONS request on a resource to understand what content types are available for GETTing that resource, and can learn more about those content 
    types dynamically by visiting the content type resource itself via its url. The formats of the list of available content types in an OPTIONS call, as
    well as the formats available for GETTING a content type resource can themselves be some content type, such as plain text, json, or a specific json
    described by a typescript interface, for example, using typescript 2.1.
- Content Type converters: Often, given a representation of a resource in form A, we can automate a function to transform that into a conceptually equivalent
    format in form B. Consider classes of conversion functions among representation formats F1, F2, ... FN. Given two formats, one may find that some or all
    resources representable in format 1 are convertible to representations in format 2, via a function g. A clarifying property is whether all of the 
    represenations in format 2 can be converted back to exactly how they started as representations in format 1. Sometimes we may transform one way, but when
    we try to transform back, we lose information, or we simply don't have enough information in representation format 2 to reproduce representation format
    1. Other times, we wiggle back and forth between different values, such as we might do when representing decimal numbers using limited precision that
    differs from format to format. Ideally, one can discover content type converters given that one already knows the URLs of the desired source and 
    destination content type.
- Views by Content-Type: Consider a world where, given a representation of some resource in a given Content-Type, one could then quickly discover and 
    retrieve, at runtime, view definitions that could help render the content dynamically for the user leading to a most pleasant experience. For example, if 
    I am browsing a REST api for a 3rd party vendor that I want to integrate with, and I am discovering all the different json formats available for their 
    resources, and coupling my programs to them, and I want to show some of their data in a view that composes well with my views; a view that they 
    ultimately control, it would be great if there was a general purpose, flexible framework, which could discover and render views. For example, maybe react 
    component definitions are downloaded by the browser and can be toggled thru, in order to view data coming in particular formats that the browser knows 
    can be convertible to a format that is known to be renderable as a react component? Then the browser, or a server, could discover and chain these 
    operations together, providing the user with the resulting view, without programmers having to put all of that together, or worse, reinvent unnecessary 
    or redundant, but slightly unique, code to achieve the same outcome

Details:

    - [Resource Example](./restGuruRootResource.md)
    - [Content Types List Example](./contentTypes.md)
    - [Content Type Example](./contentType.md)