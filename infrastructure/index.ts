import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import * as k8s from "@pulumi/kubernetes";

// gcloud auth application-default login
// pulumi up

const name = "heartpoints-test"

const cluster = new gcp.container.Cluster(
  name,
  {
    initialNodeCount: 1,
    minMasterVersion: "latest",
    nodeVersion: "latest",
    nodeConfig: {
      machineType: "n1-standard-1",
      oauthScopes: [
        "https://www.googleapis.com/auth/compute",
        "https://www.googleapis.com/auth/devstorage.read_only",
        "https://www.googleapis.com/auth/logging.write",
        "https://www.googleapis.com/auth/monitoring"
      ],
    },
    location: 'us-central1-a'
  }
);

// Manufacture a GKE-style kubeconfig. Note that this is slightly "different"
// because of the way GKE requires gcloud to be in the picture for cluster
// authentication (rather than using the client cert/key directly).
export const kubeconfig = pulumi.
  all([ cluster.name, cluster.endpoint, cluster.masterAuth ]).
  apply(([ name, endpoint, masterAuth ]) => {
    const context = `${gcp.config.project}_${gcp.config.zone}_${name}`;
    return `apiVersion: v1
clusters:
- cluster:
  certificate-authority-data: ${masterAuth.clusterCaCertificate}
  server: https://${endpoint}
  name: ${context}
contexts:
- context:
  cluster: ${context}
  user: ${context}
  name: ${context}
current-context: ${context}
kind: Config
preferences: {}
users:
- name: ${context}
  user:
  auth-provider:
    config:
    cmd-args: config config-helper --format=json
    cmd-path: gcloud
    expiry-key: '{.credential.token_expiry}'
    token-key: '{.credential.access_token}'
    name: gcp
`;
  });

const clusterProvider = new k8s.Provider(name, {
  kubeconfig: kubeconfig,
});





const appLabels = { appClass: name };
const gitSha = require('child_process').execSync('git rev-parse HEAD').toString().trim()
const deployment = new k8s.apps.v1beta1.Deployment(name,
  {
    metadata: {
      labels: appLabels,
    },
    spec: {
      replicas: 1,
      template: {
        metadata: {
          labels: appLabels,
        },
        spec: {
          containers: [
            {
              name: name,
              image: `gcr.io/heartpoints-org/heartpoints.org:${gitSha}`,
              imagePullPolicy: 'IfNotPresent',
              resources: {
                requests: {
                  cpu: '25m'
                }
              },
              readinessProbe: {
                exec: {
                  command: ['curl', 'http://localhost:5001']
                },
                initialDelaySeconds: 10,
                periodSeconds: 5
              },
              livenessProbe: {
                exec: {
                  command: ['curl', 'http://localhost:5001']
                },
                initialDelaySeconds: 10,
                periodSeconds: 10
              }
            }
          ],
        }
      }
    },
  },
  {
    provider: clusterProvider,
  }
);

const serviceName = 'heartpoints-org'

const ingress = new k8s.networking.v1beta1.Ingress(name,
{
  spec: {
    backend: {
      serviceName: serviceName,
      servicePort: 80,
    }
  }
},
{
  provider: clusterProvider,
})

const service = new k8s.core.v1.Service(serviceName,
{
  spec: {
    type: 'NodePort',
    ports: [{
      port: 80,
      targetPort: 5001,
    }],
    selector: appLabels
  }
},
{
  provider: clusterProvider,
})