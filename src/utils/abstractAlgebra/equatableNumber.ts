import { Equatable } from "./Equatable";

export const equatableNumber = (value: number): Equatable<number> => ({
    toString: () => value.toString(),
    equals: (other) => value === other.value,
    value
});
