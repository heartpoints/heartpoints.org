import { TypeSwitch, TypeMatch, TypeDefault } from "../utils/Switch";
import * as _ from "lodash";
import { expect } from "chai";

describe("restful-json", () => {
    describe("primitives", () => {
        describe("null", () => {
            /*
            url
            content type makes it clear it is a json null type (i suppose a get not even needed)
            get just returns the characters "null"
            LATER - content type indicating json null type is itself a URL (immutable or with etag if mutable)
            */
        });
        describe("boolean", () => {

        });
        describe("getCompleteProjection('http://exampleRecordToStoreAsRestfulJSON')", () => {
            it("yields expectedProjection", () => {
                const projection = getCompleteProjection('http://exampleRecordToStoreAsRestfulJSON');
                expect(JSON.stringify(projection, null, 3)).to.equal(JSON.stringify(expectedProjection, null, 3));
            })
        });
    });
});

const IsStringArray = (v:any): v is Array<string> => _.isArray<string>(v) //todo: further typecheck values?
const IsStringDictionary = (v:any): v is _.Dictionary<string> => _.isPlainObject(v) //todo: further typecheck values?

//todo: how to handle circular references when projecting? 
//todo: define specialized projections for nonDAGs that define particular behaviors
const getCompleteProjection = (url:string) => {
    const representation = theInternet[url];
    const result = TypeSwitch<any, any, any>(representation,
        TypeMatch(IsStringArray, arrayRepresentation => arrayRepresentation.map(getCompleteProjection) as any),
        TypeMatch(IsStringDictionary, obj => _.mapValues(obj, getCompleteProjection)),
        TypeDefault(representation),
    );
    console.log(JSON.stringify(result, null, 3));
    return result;
}

const expectedProjection = [
    {
        "id": 1,
        "name": "Tommy",
        "favColors": ["red","green","blue"]
    },
    {
        "id": 2,
        "name": "Mike",
        "favColors": ["pink","purple"]
    }
]

//todo: do we need a primitive representation for really long arrays / key lists (with pagination?)
//todo: maybe above could be achieved in the simpler system with higher level components and we don't solve
//that problem at this level for simplicity?
const theInternet = {
    "http://exampleRecordToStoreAsRestfulJSON": [
        "http://people/1",
        "http://people/2",
    ],
    "http://people/1": {
        "id": "http://numbers/1",
        "name": "http://names/Tommy",
        "favColors": "http://people/1/favColors",
    },
    "http://people/1/favColors": [
        "http://colors/red",
        "http://colors/green",
        "http://colors/blue"
    ],
    "http://people/2": {
        "id": "http://numbers/2",
        "name": "http://names/Mike",
        "favColors": "http://people/2/favColors",
    },
    "http://people/2/favColors": [
        "http://colors/pink",
        "http://colors/purple",
    ],
    "http://happenstanceListOfColorsSharedByMultiplePeople": [
        "thisCouldBeTemporarilyRedirectedToWhenManyUsersHaveSameColorList",
    ],
    "http://numbers/1": 1,
    "http://numbers/2": 2,
    "http://names/Tommy": "Tommy",
    "http://names/Mike": "Mike",
    "http://randomShit/2f82h389hwf": "Some really long unused example string here myessssss",
    "http://colors/red": "red",
    "http://colors/green": "green",
    "http://colors/blue": "blue",
    "http://colors/pink": "pink",
    "http://colors/purple": "purple",
}