import { IMaybe } from "./IMaybe";
export type Maybes<T> = {
    [P in keyof T]: IMaybe<T[P]>;
};
