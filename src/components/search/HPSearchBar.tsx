import { doNothing } from "../../utils/doNothing";
import * as React from "react";
import Autosuggest from "react-autosuggest";
import { theme } from "./theme";

export const HPSearchBar = ({suggestions, getSuggestionValue, renderSuggestion, onSuggestionSelected, inputProps}) => {
    const autoSuggestProps = {
        suggestions,
        onSuggestionsFetchRequested: doNothing,
        onSuggestionsClearRequested: doNothing,
        renderSuggestion,
        getSuggestionValue,
        inputProps,
        alwaysRenderSuggestions: true,
        onSuggestionSelected,
        theme,
    }
    return <div style={{margin: "150px auto"}}>
        <Autosuggest {...autoSuggestProps} />
    </div>
}