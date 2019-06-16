import { field } from "../forms/field";

export const newOrgFields = ({ newOrgTitle, updateNewOrgTitle, newOrgUrl, updateNewOrgUrl, newOrgMission, updateNewOrgMission }) => ({
    title: field(() => newOrgTitle, updateNewOrgTitle, "Organization Title"),
    homepage: field(() => newOrgUrl, updateNewOrgUrl, "Organization Homepage"),
    mission: field(() => newOrgMission, updateNewOrgMission, "Mission Statement / Summary"),
});
