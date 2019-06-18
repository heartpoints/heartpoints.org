import { developers } from "./developers";
export const isDeveloper = facebookUserSession => facebookUserSession && developers.includes(facebookUserSession.email);
