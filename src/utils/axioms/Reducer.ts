export type Reducer<Accumulator, CurrentItem> = (acc: Accumulator, c: CurrentItem) => Accumulator;
