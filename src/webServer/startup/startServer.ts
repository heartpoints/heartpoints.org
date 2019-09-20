import express from "express"
import { callWith } from "../../utils/composition/callWith";
import { expressSetupSteps } from "./expressSetupSteps";
import { registerHTTPListener } from "./registerHTTPListener";
import http, { Server } from "http"

export const startServer = ():Server => {
    const expressApp = express()
    expressSetupSteps.map(callWith(expressApp))
    const server = http.createServer(expressApp)
    registerHTTPListener(server)
    return server
}
