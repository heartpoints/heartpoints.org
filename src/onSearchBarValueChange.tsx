export const onSearchBarValueChange = (state, searchBarValue) => {
    const value = searchBarValue === undefined || searchBarValue === 0 ? '' : searchBarValue;
    return {
        ...state,
        searchBarValue: value
    };
};
