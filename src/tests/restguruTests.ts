import * as _ from "lodash";
import { expect } from "chai";
import { getCompleteProjection } from "./getCompleteProjection";

describe("restful-json", () => {
    describe("getCompleteProjection('http://exampleRecordToStoreAsRestfulJSON')", () => {
        it("yields expectedProjection", () => {
            const projection = getCompleteProjection('http://exampleRecordToStoreAsRestfulJSON').value;
            expect(JSON.stringify(projection, null, 3)).to.equal(JSON.stringify(expectedProjection, null, 3));
        })
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