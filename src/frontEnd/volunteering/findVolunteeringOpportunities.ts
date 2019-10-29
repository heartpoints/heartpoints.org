import { defaultOrganizations } from "../organizations/data/defaultOrganizations";

export const findVolunteeringOpportunities = (orgOrJobTitle) => {

    const inputValue = (orgOrJobTitle || "").trim().toLowerCase();

    const filterData = () => {
        const results = defaultOrganizations.map(element => {
            if (element.title.toLocaleLowerCase().includes(inputValue)) {
                const item = element.volOpportunities.map(opp => {return ({...element, ...opp, volOpportunities:''})});
                return (item.filter(object => object != null || undefined));
            }else {
                const opportunity = element.volOpportunities.map(opp => {
                    if (opp.jobTitle.toLocaleLowerCase().includes(inputValue)){
                        return ({...element, ...opp, volOpportunities:''});
                    }
                })
                return (opportunity.filter(object => object != null || undefined));
            }
        });

        const flattenedResult = results.reduce((acc, ele) => acc.concat(ele), []);
        return (flattenedResult);
    }
    
    return inputValue.length === 0 ? [] : filterData();
}