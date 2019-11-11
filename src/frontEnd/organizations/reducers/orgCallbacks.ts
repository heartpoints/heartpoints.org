import { addNewOrganization } from "./addNewOrganization";
import { deleteOrganization } from "./deleteOrganization";
import { deleteOpportunity } from "../../volunteering/reducers/deleteOpportunity";

export const orgCallbacks = () => ({
    addNewOrganization,
    deleteOrganization,
    deleteOpportunity
})