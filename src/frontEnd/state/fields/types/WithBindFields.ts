import { BindFields } from "./BindFields";

export type WithBindFields<S, T> = {
    bindFields: BindFields<S, T>;
};
