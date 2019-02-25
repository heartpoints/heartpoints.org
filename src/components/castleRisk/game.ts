export enum Phase {
    Welcome,
    Rules,
    AddPlayer
}

export const CastleRiskInitialState = {phase: Phase.Welcome, player:"Tommy"}