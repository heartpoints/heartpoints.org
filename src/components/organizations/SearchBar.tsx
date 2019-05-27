import * as React from "react";
import Autosuggest from "react-autosuggest";
import { OrganizationSearchResult } from "./OrganizationSearchResult";
import { organizations } from "../../data/organizations";
import { HPSearchBar } from "../search/HPSearchBar";

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

    const suggestions = getSuggestions(searchBarValue);
    const hpSearchBarProps = { suggestions, getSuggestionValue, renderSuggestion, inputProps, onSuggestionSelected}

    return <HPSearchBar {...hpSearchBarProps} />
}