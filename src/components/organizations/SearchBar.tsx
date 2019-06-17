import * as React from "react";
import { HPSearchResult } from "../search/HPSearchResult";
import { HPSearchBar } from "../search/HPSearchBar";
import { Page } from "../page/Page";
import { Organization } from "./organization";

export const SearchBar = (props) => {
    const { searchBarValue, onSearchBarValueChange, organizations, navTo } = props;

    const getSuggestions = (searchBarValue) => {
        const inputValue = (searchBarValue || "").trim().toLowerCase();
        return inputValue.length === 0 
            ? [] 
            : organizations.filter(org =>
                org.title.toLowerCase().includes(inputValue)
            )
    }

    const onSuggestionSelected = ({href}) => navTo(href)

    const placeholder = "Search by organization name..."
    const suggestions = getSuggestions(searchBarValue);

    const hpSearchBarProps = { 
        placeholder,
        suggestions,
        renderSuggestion: ({mission: description, ...rest}:Organization) => <HPSearchResult {...{description, ...rest}} />,
        onSuggestionSelected,
        searchBarValue,
        onSearchBarValueChange,
    }
    
    return <Page>
        <h1>Organization Search...</h1>
        <HPSearchBar {...hpSearchBarProps} />
    </Page>
}