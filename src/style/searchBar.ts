import { addLeadingSlash } from "history/PathUtils";

export const searchBar = {
    container: {
        width: '60%'
    },
    suggestion: {
        listStyle: 'none',
        padding: "10px 20px",
        cursor: 'pointer',
        borderTop: "1px solid #eee"
    },
    suggestionFirst: {
        borderTop: "none"
    },
    input: {
        width: '450px',
        borderRadius: "10px",
        borderBottomRightRadius: '10px',   //when returning from inputFocused, bottom corners do not...
        borderBottomLeftRadius: '10px',    //...round without these two lines.
        padding: '10px 20px',
        border: "1px solid #aaa"
    },
    inputFocused: {
        outline: 'none'
    },
    inputOpen: {
        borderBottomRightRadius: '0px',
        borderBottomLeftRadius: '0px'
    },
    suggestionsContainerOpen: {
        width: '450px',
        display: 'block',
        margin: '0px',
        padding: '0px',
        backgroundColor: 'white',
        borderBottomRightRadius: '10px',
        borderBottomLeftRadius: '10px',
        border: "1px solid #aaa"
    },
    suggestionsList: {
        margin: '0px',
        padding: '0px'
    },
    suggestionHighlighted: {
        backgroundColor: 'rgba(255,0,0,0.1)'
    }
}