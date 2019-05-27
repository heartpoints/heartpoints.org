import { anyOf } from "../utils/predicate";
import { volunteeringOpportunities } from "../data/volunteeringOpportunities";

export const findVolunteeringOpportunities = (orgOrJobTitle) => {
    const inputValue = orgOrJobTitle.trim().toLowerCase();
    return inputValue.length === 0
        ? []
        : volunteeringOpportunities.filter(
            anyOf(
                option => option.title.toLocaleLowerCase().includes(inputValue),
                option => option.jobTitle.toLocaleLowerCase().includes(inputValue)
            )
        );
}