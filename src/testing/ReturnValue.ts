import { PropertyTest } from "./PropertyTest";
export type ReturnValue<P, R> = {
    [Prop in keyof R]: PropertyTest<P, R, R[Prop]>;
};
