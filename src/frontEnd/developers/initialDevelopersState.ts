import { inDevMode } from "./inDevMode";

export const initialDevelopersState = () => ({
    inDevMode: inDevMode(),
})