import { Mapper } from "../axioms/Mapper";

export type Either<Left, Right> = {
    map<NewRight>(mapper:Mapper<Right, NewRight>):Either<Left, NewRight>
    flatMap<NewLeft, NewRight>(mapper:Mapper<Right, Either<NewLeft, NewRight>>):Either<NewLeft | Left, NewRight>
}