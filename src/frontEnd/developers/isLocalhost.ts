import { localHostNameIndicators } from "./localHostNameIndicators";

export const isLocalhost = () => localHostNameIndicators.any(i => window.location.hostname.includes(i))
