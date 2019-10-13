export const envVarGetOrThrow = (envKey: string) => (): string => {
    const retVal = process.env[envKey];
    if (retVal === undefined) {
        throw new Error(`Env var ${envKey} must be defined`);
    }
    return retVal;
};
