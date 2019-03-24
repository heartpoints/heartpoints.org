import * as _ from "lodash";
import { expect } from "chai";
import { getCompleteProjection } from "./getCompleteProjection";
import { contentTypes } from "./contentTypes";

const when = (description, block) => context(`when ${description}`, block);

describe("restful-json", () => {
    describe("getCompleteProjection('http://exampleRecordToStoreAsRestfulJSON')", () => {
        it("yields expectedProjection", () => {
            const projection = getCompleteProjection('http://exampleRecordToStoreAsRestfulJSON').value;
            expect(JSON.stringify(projection, null, 3)).to.equal(JSON.stringify(expectedProjection, null, 3));
        })
    });
    describe("contentType", () => {
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