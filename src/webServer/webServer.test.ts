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
        const forHttpWithoutWWW = {
            [loadBalancerHostHeaderName]: "heartpoints.org",
            [loadBalancerProtocolHeaderName]: "http",
            [loadBalancerPortHeaderName]: "80"
        }
        whenValues({url: "http://localhost:5001/some/url?here=myes", headers: forHttpWithoutWWW}, ({url, headers}) => {
            it("redirects to https://www.heartpoints.org/some/url?here=myes", async () => { 
                const redirect = "manual"
                const response = await fetch(url, {headers, redirect})
                expect(response.status).to.equal(302)
                expect(response.headers.get("location")).to.equal("https://www.heartpoints.org/some/url?here=myes")
            })
        })
        const forHttpsWithWWW = {
            [loadBalancerHostHeaderName]: "www.heartpoints.org",
            [loadBalancerProtocolHeaderName]: "https",
            [loadBalancerPortHeaderName]: "443"
        }
        whenValues({url: "http://localhost:5001/some/url?here=myes", headers: forHttpsWithWWW}, ({url, headers}) => {
            it("yields 200", async () => { 
                const redirect = "manual"
                const response = await fetch(url, {headers, redirect})
                expect(response.status).to.equal(200)
            })
        })
    })
    after(() => server && server.close())
})