import * as k8s from "@pulumi/kubernetes"
import { appName } from "./appName";
import { serviceName } from "./serviceName";
import { servicePort } from "./servicePort";

export const heartpointsIngress = new k8s.networking.v1beta1.Ingress(appName, {
    metadata: {
        name: appName,
        annotations: {
            "kubernetes.io/ingress.global-static-ip-name": appName,
        },
    },
    spec: {
        backend: {
            serviceName,
            servicePort,
        }
    }
});
