import { nestedFieldNamed } from "../../forms/nestedFieldNamed";
import { Organization } from "../data/organization";
import { FieldBinderTransformer } from "../../forms/FieldBinderTransformer";
import { HasPossibleNewOrganization } from "./HasPossibleNewOrganization";
export const possibleNewOrganization: FieldBinderTransformer<HasPossibleNewOrganization, Organization, string> = nestedFieldNamed("possibleNewOrganization");
