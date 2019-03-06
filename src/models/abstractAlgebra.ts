/*
Binary Operator
Set
Monoid
Groups
Ring
Field (addition, multiplication, with commutative / distributive props)
Vectors as having scalars (from a field) and basis vectors (that span the vector space)
Covectors as functions that take a vector and yield a scalar (they form their own space, the "dual space")
Tensors
Modules
*/

interface Equatable<T = any> {
    equals(other:Equatable<T>):boolean
    toString():string
    value:T
}

// namespace AbstractAlgebraGeneric {
//     interface Set<T extends Equatable> {
//         includes(possibleMember:T):boolean
//         union<S extends Equatable>(anotherSet:Set<S>):Set<T | S | (S & T)>
//         intersect<S extends Equatable>(anotherSet:Set<S>):Set<S & T>
//         negation:Set<any>
//     }

//     const emptySet:Set<never> = {
//         includes: (a) => false,
//         union: (anotherSet) => anotherSet,
//         intersect: (anotherSet) => emptySet,
//         get negation() { return infiniteSet }
//     }
    
//     const infiniteSet:Set<any> = {
//         includes: (a) => true,
//         union: (anotherSet) => infiniteSet,
//         intersect: (anotherSet) => anotherSet,
//         get negation() { return emptySet }
//     }
    
//     const setContainingOneElement = <T extends Equatable>(element:T):Set<T> => ({
//         includes: (a) => a.equals(element),
//         union: (anotherSet) => infiniteSet,
//         intersect: (anotherSet) => anotherSet,
//         get negation() { return emptySet }
//     })
    
//     const unionOfTwoSets = <T extends Equatable, S extends Equatable>(set1:Set<T>, set2:Set<S>):Set<T | S | (S & T)> => ({
//         includes: (a:T | S | (S & T)) => set1.includes(a) || set2.includes(a),
//         union: (anotherSet) => infiniteSet,
//         intersect: (anotherSet) => anotherSet,
//         get negation() { return emptySet }
//     })
// }

namespace AbstractAlgebra {
    interface Set {
        toString():string
        includes(possibleMember:Equatable):boolean
        union(anotherSet:Set):Set
        intersect(anotherSet:Set):Set
        negation:Set
    }

    const emptySet:Set= {
        toString: () => `{}`,
        includes: (a) => false,
        union: (anotherSet) => anotherSet,
        intersect: (anotherSet) => emptySet,
        get negation() { return setOfEverything }
    }
    
    const setOfEverything:Set = {
        toString: () => `{ EVERYTHING }`,
        includes: (a) => true,
        union: (anotherSet) => setOfEverything,
        intersect: (anotherSet) => anotherSet,
        get negation() { return emptySet }
    }
    
    const setContainingOneElement = (element:Equatable):Set => {
        const result = {
            toString: () => `{ ${element.toString()} }`,
            includes: (a) => a.equals(element),
            union: (anotherSet) => unionOfTwoSets(result, anotherSet),
            intersect: (anotherSet) => intersectionOfTwoSets(result, anotherSet),
            get negation() { return negationOfSet(result) }
        }
        return result;
    }

    const negationOfSet = (set:Set):Set => {
        const result = {
            toString: () => `(! ${set})`,
            includes: (a) => !set.includes(a),
            union: (anotherSet) => unionOfTwoSets(result, anotherSet),
            intersect: (anotherSet) => intersectionOfTwoSets(result, anotherSet),
            get negation() { return set }
        }
        return result;
    }
    
    const unionOfTwoSets = (set1:Set, set2:Set):Set => {
        const result = {
            toString: () => `(${set1} U ${set2})`,
            includes: (a:Equatable) => set1.includes(a) || set2.includes(a),
            union: (anotherSet) => unionOfTwoSets(result, anotherSet),
            intersect: (anotherSet) => intersectionOfTwoSets(result, anotherSet),
            get negation() { return negationOfSet(result) }
        }
        return result;
    }

    const intersectionOfTwoSets = (set1:Set, set2:Set):Set => {
        const result = {
            toString: () => `(${set1} | ${set2})`,
            includes: (a:Equatable) => set1.includes(a) && set2.includes(a),
            union: (anotherSet) => unionOfTwoSets(result, anotherSet),
            intersect: (anotherSet) => intersectionOfTwoSets(result, anotherSet),
            get negation() { return negationOfSet(result) }
        }
        return result;
    }

    const equatableNumber = (value:number):Equatable<number> => ({
        toString: () => value.toString(),
        equals: (other) => value === other.value,
        value
    });

    const [e1, e2, e3, e4] = [1,2,3,4].map(equatableNumber);
    const s = setContainingOneElement;

    const expectTrue = (message:string, condition:boolean) =>
        console.log(`${condition ? 'passed' : 'failed'} - ${message}`)

    const s1U2 = s(e1).union(s(e2));
    const l = (...args) => console.log(...args.map(a => a.toString()));

    l(s1U2)
    expectTrue('1 E {1} U {2}', s1U2.includes(e1));
}