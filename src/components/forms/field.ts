export const field = (selector, reducer, placeholder) => ({
    get value() { return selector(); },
    setValue(newValue) { reducer(newValue); },
    placeholder,
});
