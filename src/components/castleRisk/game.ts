export enum Phase {
    Welcome,
    Rules,
}

export interface State {
    phase:Phase,
    onBeginGameRequested:()=>unknown
}

export const castleRiskInitialState:State = {
    phase: Phase.Welcome,
    onBeginGameRequested: alert
}