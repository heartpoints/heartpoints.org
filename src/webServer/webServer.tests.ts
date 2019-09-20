import { when } from "../testing/expect"
import { describe } from "mocha"
import { startServer } from "./startup/startServer"
import { Server } from "http";
import expect from "expect";

describe("web server", () => {
    let server:Server | null = null
    before(() => server = startServer())
    describe("root resource", () => {
        when("GET", async () => {
            const response = await fetch("http://www.cnn.com")
            const text = await response.text()
            expect(text).toContain("nav-linksstyles__SectionSubLink-sc-1tike8v-7")
        })
    })
    after(() => server && server.close())
})