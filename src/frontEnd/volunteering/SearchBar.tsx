import * as React from "react";
import { HPSearchBar } from "../search/HPSearchBar";
import { HPSearchResult } from "../search/HPSearchResult";
import { findVolunteeringOpportunities } from "./findVolunteeringOpportunities";
import { Page } from "../page/Page"
import { Space } from "../page/Space"
import { PageTitle } from "../page/PageTitle";

export const SearchBar = (props) => {
    const { searchBarValue, onSearchBarValueChange, navTo } = props;

    const onSuggestionSelected = ({ jobID }) => 
        navTo("/volunteering/" + jobID);

    const renderSuggestion = ({imageThumbnailURL, jobTitle: title, jobDescription: description, title: subtitle}) =>
        <HPSearchResult {...{imageThumbnailURL, title, description, subtitle}} />

    const hpSearchBarProps = {
        placeholder: "Search by organization name or job title...",
        suggestions: findVolunteeringOpportunities(searchBarValue),
        onSuggestionSelected,
        renderSuggestion,
        searchBarValue,
        onSearchBarValueChange,
    } 
    
    return <Page>
        <PageTitle>Volunteering Opportunity Search...</PageTitle>
        <Space />
        <HPSearchBar {...hpSearchBarProps} />
    </Page>
}