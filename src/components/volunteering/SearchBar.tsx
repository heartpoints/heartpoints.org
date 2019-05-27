// MERGED CODE OF VolunteeringSearchBar.tsx and SearchBar.tsx IN THIS FILE

import * as React from "react";
import Autosuggest from "react-autosuggest";
import { OrganizationSearchResult } from "../organizations/OrganizationSearchResult";
import { VolunteeringSearchResult } from "../volunteering/VolunteeringSearchResult";
import { HPSearchBar } from "../search/HPSearchBar";
import { findVolunteeringOpportunities } from "../../models/volunteeringOpportunities";

export const SearchBar = (props) => {
    const { searchBarValue } = props;
    const getSuggestionValue = (suggestion) => suggestion.title;
   
    const renderSuggestionCalculator = (suggestion) => {
        let result = <p>Error in finding results</p>;
        if (props.id === 'search') { //if user is searching organization, render suggestions in one style
            result = <OrganizationSearchResult
                        imageThumbnailURL={suggestion.imageThumbnailURL}
                        title={suggestion.title}
                        statement={suggestion.statement} />
        }
        if (props.id === 'volunteer') { //if user is searching volunteering options, render suggestions in another style
            console.log('renderSuggestionCalculator -> props.id === volunteer');
            result = <VolunteeringSearchResult
                        jobTitle={suggestion.jobTitle}
                        organization={suggestion.title}
                        jobDescription={suggestion.jobDescription} />
        }
        return result;
    }
    const renderSuggestion = (suggestion) => (
        <div>
            {renderSuggestionCalculator(suggestion) }
        </div>
    );

    const onSearchBarValueChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const searchBarValue = event.target.value;
        props.onSearchBarValueChange(searchBarValue);
    }

    const onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
        alert("You Selected the Organization Titled '" + suggestionValue +"'");
    }

    const inputProps = {
        placeholder: 'Search by organization name or job title...',
        value: searchBarValue,
        onChange: onSearchBarValueChange
    }

    const suggestions = findVolunteeringOpportunities(searchBarValue);

    const hpSearchBarProps = {
        suggestions,
        getSuggestionValue,
        inputProps,
        onSuggestionSelected,
        renderSuggestion,
    } 
    
    return <HPSearchBar {...hpSearchBarProps} />
}