import * as React from "react";

import { HPModal } from "./HPModal";
import { SearchBar } from "./SearchBar";

export const SearchModal = (props) => {
    return(
        <HPModal
            title="Search"
            subtitle={<h3>Blablablabla</h3>}
            imageURL="images/search.png"
            onXClicked={props.onXClicked}>
            <SearchBar {...props} /> 
        </HPModal>
    )
}