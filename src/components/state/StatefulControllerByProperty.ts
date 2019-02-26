export const StatefulControllerByProperty = statefulController => (propertyName, initialState) => statefulController(
    state => state[propertyName] || initialState,
    (state, change) => ({...state, [propertyName]: change})
)