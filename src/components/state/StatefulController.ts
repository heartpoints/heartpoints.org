import { SFC } from "react";

export const StatefulController = <AppState, ComponentState, Props>
    (renderApp:(s:AppState)=>void, broadState:AppState) => 
    (getState:(s:AppState) => ComponentState, saveState:(a:AppState, c:ComponentState) => AppState) => 
    (wrappedComponent:SFC<Props>) => 
    (wrappedComponentProps:Props) => {
        const currentComponentState = getState(broadState);
        const updateState = (componentStateChange) => {
            const newComponentState = {...currentComponentState, ...componentStateChange}
            const newState = saveState(broadState, newComponentState);
            renderApp(newState)
        }
        return wrappedComponent(
            {
                ...currentComponentState,
                ...wrappedComponentProps,
                updateState
            }
        );
    }