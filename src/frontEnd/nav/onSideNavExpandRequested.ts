export const onSideNavExpandRequested = (state) => ({
    ...state,
    isSideNavExpanded: !state.isSideNavExpanded
});