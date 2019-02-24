enum Phase {
    Welcome,
    Rules,
}

interface State {
    phase:Phase
}

const initialState:State = {
    phase: Phase.Welcome
}