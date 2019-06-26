export type Field<T> = {
    value: T;
    setValue(t: T): void;
    placeholder: string;
};
