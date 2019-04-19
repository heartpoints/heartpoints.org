import * as React from "react";
import Autosuggest from "react-autosuggest";
import { OrganizationSearchResult } from "./OrganizationSearchResult";

import { searchBar } from "../../style/searchBar";

const organizations = [
    {
        imageThumbnailURL: "images/demo_icon.png",
        title: 'Heartpoints',
        statement: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        orgURL: "https:heartpoints.org"
    },
    {
        imageThumbnailURL: "images/demo_icon.png",
        title: 'Hard Points',
        statement: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
        orgURL: "https://google.com"
    },
    {
        imageThumbnailURL: "images/demo_icon.png",
        title: 'Some Organization',
        statement: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo',
        orgURL: "https://bing.com"
    },
    {
        imageThumbnailURL: "images/demo_icon.png",
        title: 'Altruistic Company',
        statement: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
        orgURL: "https://yahoo.com"
    }
];

export const SearchBar = (props) => {
    const { searchBarValue } = props;

    const getSuggestions = (searchBarValue) => {
        const inputValue = searchBarValue.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : organizations.filter(org =>
            org.title.toLowerCase().includes(inputValue)
        );
    }

    const getSuggestionValue = (suggestion) => suggestion.title;
   

    const renderSuggestion = (suggestion) => (
        <OrganizationSearchResult
            imageThumbnailURL={suggestion.imageThumbnailURL}
            title={suggestion.title}
            statement={suggestion.statement} />
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