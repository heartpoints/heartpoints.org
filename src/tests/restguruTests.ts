import * as _ from "lodash";
import { whenValues, itExpects } from "./expect";
import { theInternet } from "../restguru/theInternet";
import { expect } from "chai";
import { getCompleteProjection } from "../restguru/getCompleteProjection";

describe("restful-json", () => {
    describe("theInternet", () => {
        const simpleResourceTest = ({url,contentType,expectedValue}) => 
            whenValues({url, contentType}, () => {
                const result = () => theInternet({url, contentType})
                itExpects(result).toBehaveAsFollows(maybeRepresentation => {
                    expect(maybeRepresentation.value).to.equal(expectedValue);
                });
            });
            
        simpleResourceTest({
            url: "http://names/Tommy",
            contentType: "ifdjhsidufh",
            expectedValue:"Tommy"
        })

        simpleResourceTest({
            url: "http://colors/red",
            contentType: "ifdjhsidufh",
            expectedValue:"red"
        })

        simpleResourceTest({
            url: "http://colors/red",
            contentType: "text/html",
            expectedValue:"<html><body><h1>red</h1><p>red is a color</body></html>"
        })
    });

    describe("getCompleteProjection()", () => {
        const url = "http://exampleRecordToStoreAsRestfulJSON"
        const contentType="http://exampleRecordToStoreAsRestfulJSON"
        whenValues({url, contentType}, () => {
            const result = () => getCompleteProjection({url, contentType})
            itExpects(result).toBehaveAsFollows(projection => {
                const actual = JSON.stringify(projection.value, null, 3)
                const expected = JSON.stringify(expectedProjection, null, 3)
                expect(actual).to.equal(expected);
            });
        });
    });
});

const expectedProjection = [
    {
        "id": 1,
        "name": "Tommy",
        "favoriteColors": ["red","green","blue"]
    },
    {
        "id": 2,
        "name": "Mike",
        "favoriteColors": ["pink","purple"]
    }
]