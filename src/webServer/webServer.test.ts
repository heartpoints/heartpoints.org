import { expect } from "chai"
import { describe } from "mocha"
import { startServer } from "./startup/startServer"
import { Server } from "http";
import fetch from "node-fetch";
import { whenValues } from "../testing/whenValues";
import { loadBalancerHostHeaderName } from "./immutableRequest/loadBalancerHostHeaderName"
import { loadBalancerProtocolHeaderName } from "./immutableRequest/loadBalancerProtocolHeaderName"
import { loadBalancerPortHeaderName } from "./immutableRequest/loadBalancerPortHeaderName";

describe("web server", () => {
    let server:Server | null = null
    before(async () => server = await startServer())
    describe("root resource", () => {
        describe("GET", async () => {
            it("returns expected html", async () => { 
                const response = await fetch("http://localhost:5001")
                const text = await response.text()
                expect(text).to.contain("<title>heartpoints.org</title>")
            })
        })
    })
    after(() => server && server.close())
})