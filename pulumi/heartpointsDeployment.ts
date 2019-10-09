import * as k8s from "@pulumi/kubernetes"
import { appName } from "./appName";
import { appLabels } from "./appLabels";
import { webAppContainer } from "./webAppContainer";

export const heartpointsDeployment = new k8s.apps.v1.Deployment(appName, {
    spec: {
        selector: { matchLabels: appLabels },
        replicas: 1,
        template: {
            metadata: { labels: appLabels },
            spec: {
                containers: [ webAppContainer ]
            },
        },
    },
});
