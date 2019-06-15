export const updateState = (state, newState) => ({
    ...state,
    castleRisk: {
        ...state.castleRisk,
        ...newState,
    }
})