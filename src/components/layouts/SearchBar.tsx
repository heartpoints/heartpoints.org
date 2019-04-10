import * as React from "react";
import Autosuggest from "react-autosuggest";
import { OrganizationSearchResult } from "./OrganizationSearchResult";

import { searchBar } from "../../style/searchBar";


const organizations = [
    {
        imageThumbnailURL: "images/demo_icon.png",
        title: 'Heartpoints',
        orgURL: 'http://heartpoints.org'
    },
    {
        imageThumbnailURL: "images/demo_icon.png",
        title: 'Hard Points',
        orgURL: 'http://heartpoints.org'
    },
    {
        imageThumbnailURL: "images/demo_icon.png",
        title: 'Some Organization',
        orgURL: 'http://google.com'
    },
    {
        imageThumbnailURL: "images/demo_icon.png",
        title: 'Altruistic Company',
        orgURL: 'http://bing.com'
    }
];

export const suggestionStyle = {
    "background-color": "black"
}

export const SearchBar = (props) => {
    const { searchBarValue } = props;
    console.log({searchBarValue})

    const getSuggestions = (searchBarValue) => {
        const inputValue = searchBarValue.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : organizations.filter(org =>
            org.title.toLowerCase().slice(0, inputLength) === inputValue
        );
    }

    const getSuggestionValue = (suggestion) => suggestion.name;

    const renderSuggestion = (suggestion) => (
        <OrganizationSearchResult
            imageThumbnailURL={suggestion.imageThumbnailURL}
            title={suggestion.title}
            orgURL={suggestion.orgURL} />
    );

    const onSearchBarValueChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const searchBarValue = event.target.value;
        props.onSearchBarValueChange(searchBarValue);
    }

    const inputProps = {
        placeholder: 'Type "h"...',
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
            theme={searchBar}
        />
    )
}