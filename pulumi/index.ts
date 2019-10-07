import * as k8s from "@pulumi/kubernetes";

const appName = "heartpoints-org";
const appLabels = { app: appName };
const image = "minikube/heartpoints.org:619dcadc3ca12cfa28d2b96e9fd375a072e1624f"
const heartpointsDeployment = new k8s.apps.v1.Deployment(appName, {
    spec: {
        selector: { matchLabels: appLabels },
        replicas: 1,
        template: {
            metadata: { labels: appLabels },
            spec: { 
                containers: [
                    {
                        name: appName,
                        image,
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

const servicePort = 80

const heartpointsService = new k8s.core.v1.Service(`${appName}-nodeport`, {
    metadata: {
        name: appName,
    },
    spec: {
        type: "NodePort",
        ports: [{
            port: servicePort,
            targetPort: 5001
        }],
        selector: heartpointsDeployment.spec.selector.matchLabels
    }
})

const serviceName = heartpointsService.metadata.name

const heartpointsIngress = new k8s.networking.v1beta1.Ingress(appName, {
    metadata: {
        name: appName,
        annotations: {
            "kubernetes.io/ingress.global-static-ip-name": appName,
            // networking.gke.io/managed-certificates: "www-heartpoints-org-cert,heartpoints-org-cert"
        },
    },
    spec: {
        backend: {
            serviceName,
            servicePort,
        }
    }
})
