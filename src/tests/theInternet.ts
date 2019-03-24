import { fields } from "./fields";
import { people } from "./people";
import { numbers } from "./numbers";
import { names } from "./names";
import { contentTypes } from "./contentTypes";
import { colors } from "./colors";
import { Maybe, first, maybeValueForKey } from "./maybe";

export const theInternet = ({url}):Maybe<unknown> => first(
    {url},
    oldInternet,
    colors,
)

const basicResources = {
    ...fields,
    ...people,
    ...names,
    ...numbers,
    ...contentTypes,
}

const oldInternet = ({url}) => maybeValueForKey(basicResources)(url)