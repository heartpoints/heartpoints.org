import { BindField } from "./BindField";

export type WithBindField<S, T> = {
    bindField: BindField<S, T>;
};
