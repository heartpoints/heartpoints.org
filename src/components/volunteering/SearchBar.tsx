import * as React from "react";
import { HPSearchBar } from "../search/HPSearchBar";
import { HPSearchResult } from "../search/HPSearchResult";
import { findVolunteeringOpportunities } from "./findVolunteeringOpportunities";
import { Page } from "../page/Page"

export const SearchBar = (props) => {
    const { searchBarValue, onSearchBarValueChange } = props;

    const onSuggestionSelected = ({ jobTitle }) =>
        alert(`You Selected the job titled "${jobTitle}"`);

    const renderSuggestion = ({imageThumbnailURL, jobTitle: title, jobDescription: statement, title: subtitle}) =>
        <HPSearchResult {...{imageThumbnailURL, title, statement, subtitle}} />

    const hpSearchBarProps = {
        placeholder: "Search by organization name or job title...",
        suggestions: findVolunteeringOpportunities(searchBarValue),
        onSuggestionSelected,
        renderSuggestion,
        searchBarValue,
        onSearchBarValueChange,
    } 
    
    return <Page>
        <h1>Volunteering Opportunity Search...</h1>
        <HPSearchBar {...hpSearchBarProps} />
    </Page>
}