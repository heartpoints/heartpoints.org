import { Headers } from "./headers";
import { loadBalancerProtocolHeaderName } from "./loadBalancerProtocolHeaderName";
import { loadBalancerHostHeaderName } from "./loadBalancerHostHeaderName";
import { loadBalancerPortHeaderName } from "./loadBalancerPortHeaderName";
import { IMaybe } from "../../utils/maybe/IMaybe";
import { Protocol } from "../../utils/url/Protocol";
import { HostName } from "./HostName";

export type LoadBalancer = {
    originalProtocol: IMaybe<Protocol>;
    originalHost: IMaybe<HostName>;
    originalPort: IMaybe<number>;
};

export const loadBalancer = (headers: Headers): LoadBalancer => ({
    originalProtocol: headers[loadBalancerProtocolHeaderName].map(h => h === "http" ? "http" : "https"),
    originalHost: headers[loadBalancerHostHeaderName],
    originalPort: headers[loadBalancerPortHeaderName].map(p => Number(p))
});

