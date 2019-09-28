export type TypesafeEntries = <P extends keyof T, T>(obj:T) => Array<[P, T[P]]>
export const typesafeEntries: TypesafeEntries = Object.entries;
