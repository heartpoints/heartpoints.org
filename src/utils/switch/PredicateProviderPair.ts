import { Provider } from "../axioms/Provider";
import { Pair } from "../axioms/Pair";
export type PredicateProviderPair<V> = Pair<Provider<boolean>, Provider<V>>;
