import * as k8s from "@pulumi/kubernetes";
import * as docker from "@pulumi/docker";

const appName = "heartpoints-org";

const imageName = process.env["taggedImageName"]
if (imageName === undefined) {
    throw new Error("Env var taggedImageName must be defined")
}

const commitSha = process.env["shaToBuild"]
if (commitSha === undefined) {
    throw new Error("Env var shaToBuild must be defined")
}

const registryHostAndPort = process.env["registryHostAndPort"]
if (registryHostAndPort === undefined) {
    throw new Error("Env var registryHostAndPort must be defined")
}

//TODO: Error: [repositoryUrl] should not contain a tag: 5000/heartpoints.org
//see: https://github.com/pulumi/pulumi-docker/pull/107/files
//temp workaround: use an internet-based docker repo! booooo
const dockerImage = new docker.Image(appName, {
    build: {
        context: "../",
        args: { 
            commitSha
        }
    },
    imageName,
    registry: {
        server: registryHostAndPort,
        username: "",
        password: ""
    }
})

const appLabels = { app: appName };
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
        selector: appLabels
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
