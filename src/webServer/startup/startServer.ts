import express from "express"
import { callWith } from "../../utils/composition/callWith";
import { setupSteps } from "./setupSteps";

export const startServer = () => setupSteps.map(callWith(express()))
