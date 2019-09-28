import { NewUnitTest } from "./NewUnitTest";
import { UnitTest } from "./unitTest";

export type UnitTestDefinition = (newUnitTest: NewUnitTest) => UnitTest;
