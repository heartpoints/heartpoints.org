import { nestedField } from "./nestedField";
export const nestedFieldNamed = (name: string) => nestedField((s: any) => s[name], (s, value) => ({ ...s, [name]: value }));
