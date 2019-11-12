import React, { useState } from "react";
import { ComponentWithOverlay } from "../page/ComponentWithOverlay";
import { HPSearchBar } from "../search/HPSearchBar";
import { HPSearchResult } from "../search/HPSearchResult";
import { findVolunteeringOpportunities } from "./findVolunteeringOpportunities";
import { Page } from "../page/Page"
import { Space } from "../page/Space"
import { PageTitle } from "../page/PageTitle";

export const SearchBar = (props) => {
    const { volSearchBarValue: searchBarValue, onVolSearchBarValueChange: onSearchBarValueChange, navTo, organizations } = props;

    const onSuggestionSelected = ({ jobID }) => 
        navTo(`/volunteering/${jobID}`);

    const renderSuggestion = ({imageThumbnailURL, jobTitle: title, jobDescription: description, title: subtitle}) =>
        <HPSearchResult {...{imageThumbnailURL, title, description, subtitle}} />

    const [shouldShowOverlay, toggleOverlay] = useState(false);

    const onFocus = () => {
        toggleOverlay(true);
    }
    
    const onBlur = () => {
        toggleOverlay(false);
    }

    const renderSuggestionsContainer = ({containerProps, children, query}) => {
        return shouldShowOverlay && <div {...containerProps}>{children}</div>
    }

    const hpSearchBarProps = {
        placeholder: "Organization Name or Job Title...",
        suggestions: findVolunteeringOpportunities(searchBarValue, organizations),
        onSuggestionSelected,
        renderSuggestion,
        searchBarValue,
        onSearchBarValueChange,
        onBlur,
        onFocus,
        renderSuggestionsContainer,
    } 
    
    return <Page>
        <PageTitle>Volunteering Opportunity Search...</PageTitle>
        <Space />
        <ComponentWithOverlay bgColor={"#FFF"} showOverlay={shouldShowOverlay}>
            <HPSearchBar {...hpSearchBarProps} />
        </ComponentWithOverlay>
    </Page>
}