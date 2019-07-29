export type Field<T> = {
    value: T
    title: string
    setValue(t: T): void
    placeholder: string
};
