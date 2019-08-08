import * as ReactDOM from "react-dom"
import { rootSiteElement } from "../browser/rootSiteElement"
import { applyStatefulBrowserHooks } from "../browser/applyStatefulBrowserHooks"
import { renderedSiteForState } from "./renderedSiteForState"

export const renderApp = <S,>(state:S) => {
    applyStatefulBrowserHooks(state)
    ReactDOM.render(
        renderedSiteForState(state),
        rootSiteElement()
    )
}