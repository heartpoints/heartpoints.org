
import { appName } from "./appName";
import { appLabels } from "./appLabels";
import { servicePort } from "./servicePort";
import * as k8s from "@pulumi/kubernetes";

export const heartpointsService = new k8s.core.v1.Service(`${appName}-nodeport`, {
    metadata: {
        name: appName,
    },
    spec: {
        type: "NodePort",
        ports: [{
            port: servicePort,
            targetPort: 5001
        }],
        selector: appLabels
    }
});
