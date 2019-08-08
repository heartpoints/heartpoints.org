import { renderApp } from "../react/renderApp"

export const applyBrowserResizeHooks = 
    state => 
    window.onresize = () => renderApp(state)
