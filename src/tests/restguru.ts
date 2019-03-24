import { TypeSwitch, TypeMatch, TypeDefault } from "../utils/Switch";
import * as _ from "lodash";
import { expect } from "chai";

describe("restful-json", () => {
    describe("getCompleteProjection('http://exampleRecordToStoreAsRestfulJSON')", () => {
        it("yields expectedProjection", () => {
            const projection = getCompleteProjection('http://exampleRecordToStoreAsRestfulJSON');
            expect(JSON.stringify(projection, null, 3)).to.equal(JSON.stringify(expectedProjection, null, 3));
        })
    });
});

const IsStringArray = (v:any): v is Array<string> => _.isArray<string>(v) //todo: further typecheck values?
const IsStringDictionary = (v:any): v is _.Dictionary<string> => _.isPlainObject(v) //todo: further typecheck values?

//todo: define specialized projections for nonDAGs that define particular behaviors
const getCompleteProjection = (url:string) => {
    const representation = theInternet[url];
    const result = TypeSwitch<any, any, any>(representation,
        TypeMatch(IsStringArray, arrayRepresentation => arrayRepresentation.map(getCompleteProjection)),
        TypeMatch(IsStringDictionary, obj => _.mapValues(obj, getCompleteProjection)),
        TypeDefault(representation),
    );
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
    "http://numbers/1": 1,
    "http://numbers/2": 2,
    "http://names/Tommy": "Tommy",
    "http://names/Mike": "Mike",
    "http://colors/red": "red",
    "http://colors/green": "green",
    "http://colors/blue": "blue",
    "http://colors/pink": "pink",
    "http://colors/purple": "purple",
}