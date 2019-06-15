import { createBrowserHistory } from "history";
import * as _ from "lodash"

export const history = _.memoize(createBrowserHistory)