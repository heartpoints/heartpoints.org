export const contentTypes = {
    "http://rest.guru/mime/text/plain": "plain, human-readable text that respects the language and encoding requested by the client",
    "http://rest.guru/mime/application/json": "traditional json, but with a mime-type whose identifier is a URL, allowing one to discover more about it easily upon finding the identifier",
    // "http://rest.guru/rgson/completeProjection": "given an acyclic resource with content-type http://rest.guru/rgson/primitive, project it out to a http://rest.guru/mime/application/json",
    "http://rest.guru/rgson/primitive": "an isolated string, boolean, null, number, array or object. if an array, an array of URLs. if an object, an object where each key and value is a url. no nesting supported for this content type",
}

// http://rest.guru/
//     /mime
//         /text
//             /plain
//         /image
//             /jpeg
//             /png
//         /application
//             /json
//     /rgson
//         /immutable
//         /mutable
//         /cyclic
//         /acyclic
//         /withOrWithoutSeveralProperties?immutable=true&otherProp=true&cyclic=false
//         hash-key
//         string
//         boolean