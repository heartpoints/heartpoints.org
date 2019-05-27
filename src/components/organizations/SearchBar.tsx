import * as React from "react";
import Autosuggest from "react-autosuggest";
import { OrganizationSearchResult } from "./OrganizationSearchResult";
import { organizations } from "../../data/organizations";
import { HPSearchBar } from "../search/HPSearchBar";

export const SearchBar = (props) => {
    const { searchBarValue, onSearchBarValueChange } = props;

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

    const onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
        alert("You Selected the Organization Titled '" + suggestionValue +"'");
    }

    const placeholder = "Search by organization name..."
    const suggestions = getSuggestions(searchBarValue);
    const hpSearchBarProps = { 
        placeholder,
        suggestions,
        getSuggestionValue,
        renderSuggestion,
        onSuggestionSelected,
        searchBarValue,
        onSearchBarValueChange,
    }

    return <HPSearchBar {...hpSearchBarProps} />
}