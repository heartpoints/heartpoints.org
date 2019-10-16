
import React, {useState} from "react";
import { HPSearchResult } from "../../search/HPSearchResult";
import { HPSearchBar } from "../../search/HPSearchBar";
import { Page } from "../../page/Page";
import { Organization } from "../data/organization";
import { Typography } from "@material-ui/core";
import { Space } from "../../page/Space";
import { PageTitle } from "../../page/PageTitle";

export const overlayStyle:React.CSSProperties = {
    "position": "absolute",
    "top": "0px",
    "left": "0px",
    "width": "100%",
    "height": "100%",
    "backgroundColor": "rgba(0,0,0,0.5)"
}

export const SearchBar = (props) => {
    const { searchBarValue, onSearchBarValueChange, organizations, navTo } = props;

    const [isInFocus, toggleOverlay] = useState(false);

    const getSuggestions = (searchBarValue) => {
        const inputValue = (searchBarValue || "").trim().toLowerCase();
        return inputValue.length === 0 
            ? [] 
            : organizations.filter(org =>
                (org.title || "").toLowerCase().includes(inputValue)
            )
    }

    const onSearchBarGetsOrLosesFocus = (stateOfOverlay:boolean) => {
        console.log(stateOfOverlay);
        toggleOverlay(stateOfOverlay);
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
        onSearchBarGetsOrLosesFocus
    }
    
    return <Page>
        <PageTitle>Organization Search...</PageTitle>
        <Space />
        <HPSearchBar {...hpSearchBarProps} />
        {isInFocus && <div style={overlayStyle}></div>}
    </Page>
}