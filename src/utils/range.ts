export const range = (n: number): number[] => n == 0 ? [0] : [n, ...range(n - 1)];
