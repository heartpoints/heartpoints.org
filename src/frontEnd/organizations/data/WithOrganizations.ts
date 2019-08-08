import { Organizations } from "./Organizations"
import { organizations } from "../reducers/organizations";

export type WithOrganizations = {
    [organizations]: Organizations
}