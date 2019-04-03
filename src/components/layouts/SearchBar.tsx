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
    const { searchBarValue } = props;
    console.log({searchBarValue})

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

    const onSearchBarValueChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const searchBarValue = event.target.value;
        // console.log("original event", {searchBarValue})
        // console.log({controlValue, searchBarValue});
        props.onSearchBarValueChange(searchBarValue);
    }

    // const onSuggestionsFetchRequested = ({ value }) => {
    //     const currentSuggestions = getSuggestions(value);
    //     props.onSuggestionsFetchRequested(currentSuggestions);
    // }

    // const onSuggestionsClearRequested = () => {
    //     props.onSuggestionsClearRequested();
    // }

    const inputProps = {
        placeholder: 'Search...',
        value: searchBarValue,
        onChange: onSearchBarValueChange
    }

    const searchBarSuggestions = getSuggestions(searchBarValue);

    return(
        <Autosuggest
            suggestions={searchBarSuggestions}
            onSuggestionsFetchRequested={()=>undefined}
            onSuggestionsClearRequested={()=>undefined}
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