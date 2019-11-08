import { addNewOrganization } from "./addNewOrganization";
import { deleteOrganization } from "./deleteOrganization";

export const orgCallbacks = () => ({
    addNewOrganization,
    deleteOrganization,
})