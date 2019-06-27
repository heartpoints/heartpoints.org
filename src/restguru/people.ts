import { Switch } from "../utils/switch/Switch";
import { Maybe } from "../utils/maybe/maybe";
import { RGSONValue } from "./rgson";

export const people = ({url}):Maybe<RGSONValue> => Switch.when(url)
    .case("http://people", [
        "http://people/1",
        "http://people/2",
    ])
    .case("http://people/1", {
        "http://fields/id": "http://numbers/1",
        "http://fields/name": "http://names/Tommy",
        "http://fields/favoriteColors": "http://people/1/favColors",
    })
    .case("http://people/1/favColors", [
        "http://colors/red",
        "http://colors/green",
        "http://colors/blue"
    ])
    .case("http://people/2", {
        "http://fields/id": "http://numbers/2",
        "http://fields/name": "http://names/Mike",
        "http://fields/favoriteColors": "http://people/2/favColors",
    })
    .case("http://people/2/favColors", [
        "http://colors/pink",
        "http://colors/purple",
    ])
    .result
