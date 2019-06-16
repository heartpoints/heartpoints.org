export const field = (selector, reducer, placeholder) => state => ({
    get value() { return selector(state); },
    setValue(newValue) { reducer(newValue); },
    placeholder,
});
