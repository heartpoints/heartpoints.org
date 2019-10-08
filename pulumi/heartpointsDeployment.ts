import * as k8s from "@pulumi/kubernetes"
import { appName } from "./appName";
import { dockerImage } from "./dockerImage";
import { appLabels } from "./appLabels";

export const heartpointsDeployment = new k8s.apps.v1.Deployment(appName, {
    spec: {
        selector: { matchLabels: appLabels },
        replicas: 1,
        template: {
            metadata: { labels: appLabels },
            spec: {
                containers: [
                    {
                        name: appName,
                        image: dockerImage.id,
                        imagePullPolicy: "IfNotPresent",
                        resources: {
                            requests: { cpu: "25m" },
                        },
                        readinessProbe: {
                            exec: {
                                command: [
                                    "curl",
                                    "http://localhost:5001"
                                ]
                            },
                            initialDelaySeconds: 10,
                            periodSeconds: 5
                        },
                        livenessProbe: {
                            exec: {
                                command: [
                                    "curl",
                                    "http://localhost:5001"
                                ]
                            },
                            initialDelaySeconds: 10,
                            periodSeconds: 10
                        }
                    }
                ]
            },
        },
    },
});
