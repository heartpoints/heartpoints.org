import { IUrl } from "./IUrl";
import { Url } from "./Url";

export const urlFromString = (urlString: string): IUrl => Url(new URL(urlString));
