export const theme = {
    container: {
        width: '500px'
    },
    suggestion: {
        listStyle: 'none',
        padding: ".5em 1em",
        cursor: 'pointer',
        borderTop: "thin solid #eee"
    },
    suggestionFirst: {
        borderTop: "none"
    },
    inputFocused: {
        outline: 'none'
    },
    inputOpen: {
        borderBottomRightRadius: '0',
        borderBottomLeftRadius: '0'
    },
    suggestionsContainerOpen: {
        width: '100%',
        display: 'block',
        margin: '0',
        padding: '0',
        backgroundColor: 'white',
        borderBottomRightRadius: '0.5em',
        borderBottomLeftRadius: '0.5em',
        border: "thin solid #aaa"
    },
    suggestionsList: {
        margin: '0',
        padding: '0'
    },
    suggestionHighlighted: {
        backgroundColor: 'rgba(255,0,0,0.1)'
    }
}