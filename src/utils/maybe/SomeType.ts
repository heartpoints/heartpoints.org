import { IMaybe } from "./IMaybe";

export type SomeType<T> = IMaybe<T> & {
    value:T
}