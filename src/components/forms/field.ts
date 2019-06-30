import { Mapper } from "../../utils/axioms/Mapper";
import { Reducer } from "../../utils/axioms/Reducer";
import { Consumer } from "../../utils/axioms/Consumer";
import { Field } from "./types/Field";
import { FieldBinder } from "./types/FieldBinder";
import { ToStringable } from "../../utils/strings/ToStringable";
// import { access } from "fs";
// import { renderApp } from "../state/renderApp";

export const field = 
    <S, T>(selector: Mapper<S, T>, reducer: Reducer<S, T>, placeholder: string, title?:string):FieldBinder<S, T> => 
    (state: S, renderApp: Consumer<S>): Field<T> => 
    ({
        get value() { return selector(state); },
        get title() { return title || placeholder },
        setValue(newValue:T) { renderApp(reducer(state, newValue)) },
        placeholder,
    });

// type State = {
//     someString:string,
//     someBoolean:boolean,
//     someObject: {
//         someNumber:number
//     }
// }

// const fieldBinderOfNumber:FieldBinder<State, number> = field(
//     (a:State) => a.someObject.someNumber,
//     (acc:State, newValue:number) => ({ ...acc, someObject: { someNumber: newValue }}),
//     "number here",
//     "Age"
// )

// const initialState:State = {
//     someBoolean: true,
//     someString: "myes",
//     someObject: {
//         someNumber: 8
//     }
// }

// const fieldOfNumber:Field<number> = fieldBinderOfNumber(initialState, renderApp)