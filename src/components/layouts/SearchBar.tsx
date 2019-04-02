import * as React from "react";
import Autosuggest from "react-autosuggest";


const organizations = [
    {
        name: 'Heartpoints',
        url: 'http://hearpoints.org'
    },
    {
        name: 'Some Organization',
        url: 'http://google.com'
    },
    {
        name: 'Altruistic Company',
        url: 'http://bing.com'
    }
  ];

export const SearchBar = (props) => {
    const { searchBarValue, searchBarSuggestions } = props;

    const getSuggestions = (searchBarValue) => {
        const inputValue = searchBarValue.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : organizations.filter(org =>
            org.name.toLowerCase().slice(0, inputLength) === inputValue
        );
    }

    const getSuggestionValue = (suggestion) => suggestion.name;

    const renderSuggestion = (suggestion) => (
        <div>
          {suggestion.name}
        </div>
    );

    const onSearchBarValueChange = (event, newValue) => {
        props.onSearchBarValueChange(event, newValue);
    }

    const onSuggestionsFetchRequested = ({ value }) => {
        const currentSuggestions = getSuggestions(value);
        props.onSuggestionsFetchRequested(currentSuggestions);
    }

    const onSuggestionsClearRequested = () => {
        props.onSuggestionsClearRequested();
    }

    const inputProps = {
        placeholder: 'Search...',
        value: searchBarValue,
        onChange: onSearchBarValueChange
    }

    return(
        <Autosuggest
            suggestions={searchBarSuggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
        />
    )
}

/*



class Example extends React.Component {
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

*/