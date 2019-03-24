// //todo: make or find a typesafe switch with a builder / DSL with totality / intersection type result
// const switchOO = <T>(valueToConsider:T):SwitchOO<T> => ({
//     caseIs<R>(x:T, r:R):SwitchOO<T> {
//         return valueToConsider == x
//             ? 
//     }
// });

// interface SwitchOO<T> {
//     caseIs<R>(x:T, r:R):SwitchOO<T>
// }

// const example = (a:number):string => {
//     return switchOO(a).
// }