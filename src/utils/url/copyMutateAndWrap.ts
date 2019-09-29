import { IUrl } from "./IUrl";
import { Consumer } from "../axioms/Consumer";
import { Url } from "./Url";

export const copyMutateAndWrap = (nativeURL: URL, mutator: Consumer<URL>): IUrl => {
    const copy = new URL(nativeURL.toString());
    mutator(copy);
    return Url(copy);
};
