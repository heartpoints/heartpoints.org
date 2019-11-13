export const theme= {
    container: {
        width: '500px'
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
    inputFocused: {
        outline: 'none'
    },
    inputOpen: {
        borderBottomRightRadius: '0px',
        borderBottomLeftRadius: '0px'
    },
    suggestionsContainerOpen: {
        width: '100%',
        display: 'block',
        margin: '0px',
        padding: '0px',
        backgroundColor: 'white',
        borderBottomRightRadius: '10px',
        borderBottomLeftRadius: '10px',
        border: "1px solid #aaa",
        maxHeight: "50vh",
        overflowY: "auto" as "auto"
    },
    suggestionsList: {
        margin: '0px',
        padding: '0px',
    },
    suggestionHighlighted: {
        backgroundColor: 'rgba(255,0,0,0.1)'
    }
}