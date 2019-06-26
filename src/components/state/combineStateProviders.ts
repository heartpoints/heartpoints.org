import { StateProviders } from "./StateProviders";
import { StateProvider } from "./StateProvider";

export const combineStateProviders = 
    (stateProviders: StateProviders):StateProvider => 
    () =>
    stateProviders.reduce(
        (acc, current) => ({ ...acc, ...current() }), 
        {}
    );
