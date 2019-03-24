export const people = {
    "http://exampleRecordToStoreAsRestfulJSON": [
        "http://people/1",
        "http://people/2",
    ],
    "http://people/1": {
        "http://fields/id": "http://numbers/1",
        "http://fields/name": "http://names/Tommy",
        "http://fields/favoriteColors": "http://people/1/favColors",
    },
    "http://people/1/favColors": [
        "http://colors/red",
        "http://colors/green",
        "http://colors/blue"
    ],
    "http://people/2": {
        "http://fields/id": "http://numbers/2",
        "http://fields/name": "http://names/Mike",
        "http://fields/favoriteColors": "http://people/2/favColors",
    },
    "http://people/2/favColors": [
        "http://colors/pink",
        "http://colors/purple",
    ],
}