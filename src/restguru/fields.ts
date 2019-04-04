import { Switch } from "../utils/Switch";

export const fields = ({url, contentType}) => Switch.when(url)
    .case("http://fields/id", "id")
    .case("http://fields/name", "name")
    .case("http://fields/favoriteColors", Switch.when(contentType)
        .case("http://rest.guru/jsonHashKey", "favoriteColors")
        .result
        .valueOrDefault({ "somethingThat": "isNotAValidJSONKey" })
    )
    .result