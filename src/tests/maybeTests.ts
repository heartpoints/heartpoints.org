import { Some, None, reduceMaybe } from "./maybe";
import { expect } from "./expect";

describe("Maybe", () => {
    it("works", () => {
        const maybeDoThis = (x:number) => x % 2 == 0 ? Some(x * 2) : None
        const maybeDoThat = (x:number) => x % 2 == 1 ? Some(x + 3) : None
        const x = Some(5).flatMap(maybeDoThis).flatMap(maybeDoThat).valueOrDefault(2);
        expect(x).to.equal(2);
        expect(reduceMaybe(5, maybeDoThis, maybeDoThat, maybeDoThis, maybeDoThat).valueOrDefault(2)).to.equal(2);
    });
})