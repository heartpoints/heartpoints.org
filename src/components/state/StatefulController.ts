export const StatefulController = (renderApp, broadState) => (selectComponentStateFromBroaderState, stateSaver) => (pureComponent) => (props) => {
    const currentComponentState = selectComponentStateFromBroaderState(broadState);
    const updateState = (componentStateChange) => {
        const newComponentState = {...currentComponentState, ...componentStateChange}
        const newState = stateSaver(broadState, newComponentState);
        renderApp(newState)
    }
    return pureComponent(
        {
            ...currentComponentState,
            ...props,
            updateState
        }
    );
}