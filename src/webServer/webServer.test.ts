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
    describe("load balancer forwarding rules", () => {
        whenValues({url: "http://localhost:5001/some/url?here=myes"}, ({url}) => {
            it("redirects to https://www.heartpoints.org/some/url?here=myes", async () => { 
                const headers = {
                    [loadBalancerHostHeaderName]: "heartpoints.org",
                    [loadBalancerProtocolHeaderName]: "http",
                    [loadBalancerPortHeaderName]: "80"
                }
                const redirect = "manual"
                const response = await fetch(url, {headers, redirect})
                expect(response.status).to.equal(302)
                expect(response.headers.get("location")).to.equal("https://www.heartpoints.org/some/url?here=myes")
            })
        })
    })
    after(() => server && server.close())
})