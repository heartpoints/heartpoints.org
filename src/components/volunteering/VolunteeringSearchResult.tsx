import * as React from "react";

export interface VolunteeringSearchResult {
    jobTitle: string,
    organization: string,
    jobDescription: string
}

const style = {
    margin: '10px 10px 3px 0px',
    "font-style": 'italic'
    
}
export const VolunteeringSearchResult = (props:VolunteeringSearchResult) => {

    const determineLengthOfStatementToDisplay = () => {
        const statement = props.jobDescription;
        const statementLength = statement.length;

        return statementLength > 125 ? statement.slice(0, 122) + "..." : statement;
    }

   
    return(
        <div>
            <h4 style={style}>{props.jobTitle}</h4>
            <div>
                <h5 style={style}>{props.organization}</h5>
                <p style={style}>{determineLengthOfStatementToDisplay()}</p>
            </div>
        </div>
    )

}