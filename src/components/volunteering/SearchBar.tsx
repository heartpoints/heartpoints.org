// MERGED CODE OF VolunteeringSearchBar.tsx and SearchBar.tsx IN THIS FILE

import * as React from "react";
import Autosuggest from "react-autosuggest";
import { OrganizationSearchResult } from "../organizations/OrganizationSearchResult";
import { VolunteeringSearchResult } from "../volunteering/VolunteeringSearchResult";
import { volunteeringOpportunities } from "../../data/volunteeringOpportunities";
import { HPSearchBar } from "../search/HPSearchBar";

export const SearchBar = (props) => {
    const { searchBarValue } = props;

    console.log(props.id);

    const getSuggestions = (searchBarValue) => {
        const inputValue = searchBarValue.trim().toLowerCase();
        const inputLength = inputValue.length;
        
        let results;

        if (inputLength === 0) {
            results = [];
        }else if (props.id === 'search') {//If statement is to check from which link the search request has been triggered(either organization search or volunteering search).
            results = volunteeringOpportunities.filter(org => org.title.toLowerCase().includes(inputValue));
        }else if (props.id === 'volunteer') {
            results = volunteeringOpportunities.filter(option =>
                    (option.title.toLocaleLowerCase().includes(inputValue) || //search by organization name
                        option.jobTitle.toLocaleLowerCase().includes(inputValue) //search by job title
                    )
                );
        }
        return results;
    }

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
        placeholder: 'Search ...',
        value: searchBarValue,
        onChange: onSearchBarValueChange
    }

    const suggestions = getSuggestions(searchBarValue);

    const hpSearchBarProps = {
        suggestions,
        getSuggestionValue,
        inputProps,
        onSuggestionSelected,
        renderSuggestion,
    } 
    
    return <HPSearchBar {...hpSearchBarProps} />
}