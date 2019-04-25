import React from 'react';
import Autosuggest from 'react-autosuggest';
import {searchBar} from '../../style/searchBar';

const volunteeringOptions = [
    {
        title: 'Opportunity 1',
        organization: 'Heartpoints',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur'
    },
    {
        title: 'Opportunity 2',
        organization: 'Library',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur'
    },
    {
        title: 'Opportunity 3',
        organization: 'Hardpoints',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur'
    },
    {
        title: 'Opportunity 4',
        organization: 'Heartpoints',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur'
    }
];

export const VolunteeringSearchBar = (props) => {
    
    const { volunteeringSearchBarValue } = props;

    const getSuggestions = volunteeringSearchBarValue => {
        const inputValue = volunteeringSearchBarValue.trim().toLowerCase();
        const inputLength = inputValue.length;
      
        return inputLength === 0 ? [] : volunteeringOptions.filter(option =>
            (option.title.toLowerCase().slice(0, inputLength) === inputValue || //search by job title
             option.organization.toLocaleLowerCase().slice(0, inputLength) === inputValue) //search by organization name
        );
    };
    
    const getSuggestionValue = suggestion => suggestion.title;
    
    const renderSuggestion = (suggestion) => {
        return (
            <div></div>
        )
    }

    const onVolunteeringSearchBarValueChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const volunteeringSearchBarValue = event.target.value;
        props.onVolunteeringSearchBarValueChange(volunteeringSearchBarValue);
    }

    const onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
        alert("You Selected the Organization Titled '" + suggestionValue +"'");
    }
      
    const inputProps = {
        placeholder: 'Search...',
        value: volunteeringSearchBarValue,
        onChange: onVolunteeringSearchBarValueChange
    }

    return (
        <Autosuggest
            suggestions={getSuggestions(volunteeringSearchBarValue)}
            onSuggestionsFetchRequested={()=>undefined}
            onSuggestionsClearRequested={()=>undefined}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            alwaysRenderSuggestions={true}
            onSuggestionSelected={onSuggestionSelected}
            theme={searchBar}
        />
    );
}

