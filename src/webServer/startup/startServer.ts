import express from "express"
import { callWith } from "../../utils/composition/callWith";
import { expressSetupSteps } from "./expressSetupSteps";
import { httpServerListenAsync } from "./httpServerListenAsync";
import http, { Server } from "http"
import { onServerStart } from "./onServerStart";

export const startServer = async ():Promise<Server> => {
    const expressApp = express()
    expressSetupSteps.map(callWith(expressApp))
    const server = http.createServer(expressApp)
    await httpServerListenAsync(server)
    onServerStart()
    return server
}
