import { doNothing } from "../../utils/doNothing";
import * as React from "react";
import Autosuggest from "react-autosuggest";
import { theme } from "./theme";
import { identity } from "../../utils/identity";

//TODO: Note HPSearchBar is sharing its searchBarValue between screens.
export const HPSearchBar = ({searchBarValue: value, placeholder, suggestions, renderSuggestion, onSuggestionSelected, onSearchBarValueChange}) => {
    const getSuggestionValue = identity
    const onChange = ({target: { value }}:React.ChangeEvent<HTMLInputElement>) => 
        !(value === undefined || value === 0) && onSearchBarValueChange(value)

    const inputProps = {
        placeholder,
        value,
        onChange,
    }

    const autoSuggestProps = {
        suggestions,
        onSuggestionsFetchRequested: doNothing,
        onSuggestionsClearRequested: doNothing,
        renderSuggestion,
        getSuggestionValue,
        inputProps,
        alwaysRenderSuggestions: true,
        onSuggestionSelected: (event, {suggestion}) => onSuggestionSelected(suggestion),
        theme,
    }

    return <Autosuggest {...autoSuggestProps} />
}