import { Consumer } from "../utils/axioms/Consumer";
export interface ThenLike<T> {
    shouldEqual(expectedValue: T): void;
    shouldBeFalse(): void;
    shouldBeTrue(): void;
    shouldBehaveAsFollows(block: Consumer<T>): void;
    shouldEventually(block: Consumer<T>): void;
}
