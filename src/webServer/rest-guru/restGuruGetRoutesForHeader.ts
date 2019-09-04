import { Response } from "express";
import { Switch } from "../../utils/switch/Switch";
import { log } from "../../utils/debugging/log";
import { useIndexHTMLFile } from "../middleware/useIndexHTMLFile";

export const restGuruGetRoutesForHeader = 
    (res: Response) =>
    (header: string) => 
    Switch
        .when(log(header))
        .matchesLazy(h => h.includes("text/plain"), () => res.send("here is some plain text"))
        .matchesLazy(h => h.includes("text/html"), () => useIndexHTMLFile(res))
        .otherwise(() => res.sendStatus(406))
        .result
        .value