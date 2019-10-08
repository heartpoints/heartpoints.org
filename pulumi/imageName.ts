import { envVarGetOrThrow } from "./envVarGetOrThrow";

export const imageName = envVarGetOrThrow("taggedImageName")