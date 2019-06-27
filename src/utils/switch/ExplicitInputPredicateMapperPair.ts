import { Predicate } from "../predicates/Predicate";
import { Mapper } from "../axioms/Mapper";
import { Pair } from "../axioms/Pair";
export type ExplicitInputPredicateMapperPair<T, R> = Pair<Predicate<T>, Mapper<T, R>>;
