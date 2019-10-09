import { envVarGetOrThrow } from "./envVarGetOrThrow";

export const commitSha = envVarGetOrThrow("shaToBuild")
