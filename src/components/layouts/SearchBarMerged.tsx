// MERGED CODE OF VolunteeringSearchBar.tsx and SearchBar.tsx IN THIS FILE

import * as React from "react";
import Autosuggest from "react-autosuggest";
import { OrganizationSearchResult } from "./OrganizationSearchResult";
import { VolunteeringSearchResult } from "./VolunteeringSearchResult";
import { searchBar } from "../../style/searchBar";

const data = [
    {
        imageThumbnailURL: "images/demo_icon.png",
        title: 'Heartpoints',
        statement: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        orgURL: "https:heartpoints.org",
        jobTitle: 'job 1',
        jobDescription: 'abcdefghijklmnopqrstuvwxyz'
    },
    {
        imageThumbnailURL: "images/demo_icon.png",
        title: 'Hard Points',
        statement: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
        orgURL: "https://google.com",
        jobTitle: 'Need some more hands',
        jobDescription: 'abcdefghijklmnopqrstuvwxyz'
    },
    {
        imageThumbnailURL: "images/demo_icon.png",
        title: 'Some Organization',
        statement: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo',
        orgURL: "https://bing.com",
        jobTitle: 'job 2',
        jobDescription: 'abcdefghijklmnopqrstuvwxyz'
    },
    {
        imageThumbnailURL: "images/demo_icon.png",
        title: 'Altruistic Company',
        statement: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
        orgURL: "https://yahoo.com",
        jobTitle: 'opportunity 1',
        jobDescription: 'abcdefghijklmnopqrstuvwxyz'
    }
];

export const SearchBarMerged = (props) => {
    const { searchBarValue } = props;

    console.log(props.id);

    const getSuggestions = (searchBarValue) => {
        const inputValue = searchBarValue.trim().toLowerCase();
        const inputLength = inputValue.length;
        
        let results;

        if (inputLength === 0) {
            results = [];
        }else if (props.id === 'search') {//If statement is to check from which link the search request has been triggered(either organization search or volunteering search).
            results = data.filter(org => org.title.toLowerCase().includes(inputValue));
        }else if (props.id === 'volunteer') {
            results = data.filter(option =>
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
        placeholder: 'Search...',
        value: searchBarValue,
        onChange: onSearchBarValueChange
    }

    const searchBarSuggestions = getSuggestions(searchBarValue);

    return(
        <Autosuggest
            suggestions={searchBarSuggestions}
            onSuggestionsFetchRequested={()=>undefined}
            onSuggestionsClearRequested={()=>undefined}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            alwaysRenderSuggestions={true}
            onSuggestionSelected={onSuggestionSelected}
            theme={searchBar}
        />
    )
}