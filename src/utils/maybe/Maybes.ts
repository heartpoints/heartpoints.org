import { IMaybe } from "../../utils/maybe/IMaybe";
export type Maybes<T> = {
    [P in keyof T]: IMaybe<T[P]>;
};
