import { Consumer } from "../utils/axioms/Consumer";
export const blockText = <T>(block: Consumer<T>) => block.toString().replace("\n", "");
