import { nestedFieldNamed } from "../../state/fields/nestedFieldNamed";
import { Organization } from "../data/organization";
import { FieldBinderTransformer } from "../../state/fields/types/FieldBinderTransformer";
import { HasPossibleNewOrganization } from "./HasPossibleNewOrganization";
export const possibleNewOrganization: FieldBinderTransformer<HasPossibleNewOrganization, Organization, string> = nestedFieldNamed("possibleNewOrganization");
