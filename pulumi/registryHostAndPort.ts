import { envVarGetOrThrow } from "./envVarGetOrThrow";

export const registryHostAndPort = envVarGetOrThrow("registryHostAndPort")