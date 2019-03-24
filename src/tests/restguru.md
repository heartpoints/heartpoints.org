rest-guru
=========

rest-guru is about abstracting conceptual resources, the relationships among them, away
from the representation format of those resources and their relationships, by allowing
fully discoverable and dynamic content types that maximize the use of the concept of the
url as a reference to something immutable or mutable in "memory" somewhere on the internet.

# Main Concepts

URL - immutable / mutable resources
ETAG - if immutable URL, this identifies version number
CONTENT-TYPE - Instead of mime-type, use a "rest guru content type" which embeds a URL for discoverability
META-CONTENT-TYPE - Representation formats requested by rest-guru-compatible implementations 
    in order to understand specifics about the definition of a content type, provided its URL

    
# Layered Approach

TYPESCRIPT INTERFACE DYNAMIC FULFILLMENT
MUTABILITY BUILT ON TOP OF URL + ETAG combinations that map to IMMUTABLE URLS underneath
RGSON at bottom layer, IMMUTABLE

# Basic Content Types
http://rest.guru/
    /mime
        /text
            /plain
        /image
            /jpeg
            /png
        /application
            /json
    /rgson
        /immutable
        /mutable
        /withOrWithoutSeveralProperties?immutable=true&otherProp=true
        hash-key
        string
        boolean

# Next Steps

1. Add some basic content-types
2. Make it so that content type application/json can be provided from application/rgson