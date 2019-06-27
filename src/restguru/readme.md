rest.guru
=========

I navigate to rest.guru in browser, therefore sending information about myself, such as my
device, browser, etc.

I use a browser plugin or a 3rd party cookie to authenticate to rest.guru (or any other
compatible service, where my identity / session are optionally passed as a url in request headers)
along with all the other "contextual information about the request". If sent from a browser, this object
may be proxied by a trusted server with an addressable domain name and served via websockets or other
mechanisms.

It is up to the receiving web servers to choose whether or not to make use of the calling
context resource, if it is even present, for example to understand more about the user, or to understand
more about what the user's preferences might be (beyond the traditional http headers).

When I arrive at https://rest.guru

    - The URL means "the rest.guru human readable website as it 
      exists right now, customized to me, based on the headers I've sent", which include
      an optional URL to the "calling context", whose type can be negotiated later if the
      server is interested.

    - If previously fetched, the browser would send the ETAG along with an "if-changed-since" type
      header that enables caching by browser, proxies and the web server

    - The server now should redirect to the "immutable url" for the current site for the
      current user, along with the ETAG for the original URL to help with future caching.

    - The new immutable URL is requested, which ideally would contain the minimal HTML5
      and javascript needed in order to use rest.guru-enabled resources, such as javascript
      source, json data, other html, css, images, plain text, typescript source, the
      typescript compiler itself, backwards-compatible webpack (or other) modules, ideally
      leveraging HTTP2.

    - In this view, we aim to build up objects and functions from imports of urls, where,
      as often as possible, the representation of the object or function can exist in 
      many equivalent representations, but the identity / identifier is thought of as
      a url. Ideally, we build out of atomic parts that obey this constraint, including
      the primitive values, such as integers, booleans, strings, arrays, etc.

    - Within the simplest view that enables it, I would like to be able to create new
      data resources, where
        - the underlying atomic store is gson
        - i can easily write json that maps to gson underneath for me
        - the url of the derived map is a function of the map itself, so i can see as
          i type what the url would be (or at least the id), and then I can commit
          or not.
        - therefore the ability to implicitly define fields, and to also create or
          lookup sub-urls for nested values inside hashes or arrays, would be required
          to implement the generator.
        - the ability to create / update a stateful resource that should point to a
          particular immutable url based on conditions (such as etag or others) should
          be an early part of the system

    - Next I would like to be able to define functions. The definition of a function
      may be pure (all dependencies passed in) or it may include a means to import its
      dependencies, which might be values or functions, using the language of a given
      representation of the function.

    - Sometimes I may wish to express a dependence on a concept, and I want to pin to
      an immutable thing. Other times, I am ok referring to something that mutates. For
      example, when I am developing, if thinking of URLs as identifiers in a traditional
      program, it would be annoying if every time i changed a value, its identifier changed,
      because then I would have to rewrite all the consuming functions, and for the 
      same reason, their body would change, and thus their identifer would change, and
      it forms a cascade. So, sometimes I may want to refer to something that IS allowed
      to vary, but I provide / relay some type of predicate. For example, I might expect
      that some identifier is a number and as long as it still is a number then I don't 
      want to change my local name for it.

USER STORY
----------

1. open up chrome
2. navigate to https://rest.guru

COMMITS
--------

1. not sure
    1. web server listens for rest.guru
    2. browser sends information about what it knows of this resource
        1. version information as an
            1. ETAG (arbitrary string, could be semver, a commit SHA, an image tag...)
            2. Date of last retrieval
        2. cookies (here the domain tree is relevant)
        3. content type preference order 
            1. browser sends its own defaults, i don't believe browser does
               any sort of OPTIONS or other request
    3. rest.guru client can do what browser does, but also
        1. version information
            1. url to an abstract "version" description that the server
               can request using its own content-type negotation.
        2. content types
            1. Client may send an OPTIONS request, sending as part of that
               request a content type for the format it wants to use in order
               to discover the available content types. This itself should be
               identified by a URL that has a human readable representation
               explaining how that content type is used, how it looks, examples.
            2. For example, the rest.guru client could:
                1. OPTIONS https://rest.guru
                2. ACCEPT: https://rest.guru/content+types/

# Meta Content Types

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
        /cyclic
        /acyclic
        /withOrWithoutSeveralProperties?immutable=true&otherProp=true&cyclic=false
        hash-key
        string
        boolean
