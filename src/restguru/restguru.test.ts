import * as _ from "lodash";
import { whenValues, then } from "../testing/expect";
import { theInternet } from "../restguru/theInternet";
import { expect } from "chai";
import { HttpMethod } from "../restguru/HttpMethod";
import { RestClient } from "./RestClient";

describe("restful-json", () => {
    describe("theInternet", () => {
        const simpleResourceTest = ({url,contentType,expectedValue}) => 
            whenValues({url, contentType}, () => {
                const result = () => theInternet({url, contentType})
                then(result).should(maybeRepresentation => {
                    expect(maybeRepresentation.value).to.deep.equal(expectedValue);
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

        simpleResourceTest({
            url: "http://people",
            contentType: "http://rest.guru/rgson/primitive",
            expectedValue: [
                "http://people/1",
                "http://people/2",
            ]
        })

        simpleResourceTest({
            url: "http://people",
            contentType: "http://rest.guru/rgson/completeProjection",
            expectedValue: [
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
        })
    });
    describe("via actual web server", () => {
        whenValues({restClient: RestClient()}, ({restClient}) => {
            whenValues({url: "http://rest.guru", method: HttpMethod.OPTIONS, accept: ["http://rest.guru/contentTypes/http/optionsResponse"]}, ({url, method, accept}) => {
                then(() => restClient.request({url, method, accept})).shouldEventually((httpResponse) => {
                    expect(httpResponse).to.exist;
                })
            })
        });
    })
});
