export interface Equatable<T = any> {
    equals(other: Equatable<T>): boolean;
    toString(): string;
    value: T;
}
