Kubernetes
==========

We use kubernetes as a means to describe the orchestration of docker containers, load balancers, service discovery,
secret management, configuration management, canary deployment, autoscaling, etc.

# Main Components of Kubernetes (K8s) Ecosystem

1. A kubernetes cluster (one or more machines / VMs running the kubernetes server software)
    - Google Kubernetes Engine (GKE) hosts one or more K8s clusters in the broader Google Compute Platform (GCP)
    - AWS, Azure and others also have their own managed K8s clusters
    - Minikube is a self-contained K8S cluster that can be run on a Mac or other Virtualbox-enabled Laptop
2. The kubectl command line interface (pronounced cube C.T.L or cube cuddle)
    - A CLI to interact with a local or remote K8s cluster
    - Uses ENV vars and kubeconfig to determine which k8s cluster to point to
3. K8s resources
    - These constitute the description of the applications, configuration, secrets, etc. that constitute the
      heartpoints.org system insofar as it exists within k8s - this includes load balancer, the rest api, 
      and the certificate management.
    - These can be authored in YAML / JSON and hardcoded, sent directly to the K8s cluster, which then 
      attempts to bring about the system described therein.
    - These can also be templatized YAML / JSON, with placeholders for shared / changing values filled in
      by a program before they are sent to the k8s. Eg. helm charts or bash scripts, pulumi

# Running the K8s cluster on your local machine

To run a local kubernetes cluster on your local computer, try the following command:

    hp minikube start

From there, if it comes up successfully, you should be able to glance at the minikube dashboard to see its
status by running:

    hp minikube dashboard

With that in place, you can attempt to build the local codebase into docker images, deploy those to your
local kubernetes cluster, and run a post-deployment test by running:

    hp minikubeBuildDeployTest

# Deploying to K8s dev-time / pull-request-time cluster in GKE

Ideally we can create independent kubernetes clusters at any time in order to deploy to them. We can also
deploy to separate namespaces within a single kubernetes cluster.

In either case, we need a way to allow DNS / certificates / load balancing to work nicely alongside these
dev and pull-request time environments. Part of that solution is that a user may specifically want to target
one of these environments for testing purposes while changing the fewest things about the system that 
enable it to remain independent of the production system.

# Deploying to K8s in Production

Upon merge to master, our hooks run in the CircleCI environment, causing a deployment of newly built and
published docker images representing the latest codebase onto the production kubernetes cluster hosted
in GKE. The circleCI environment is equipped with a secret credential allowing it to interact with GCP
via the GCP cli and with GKE via the kubectl command.

IT IS NOT RECOMMENDED TO DEPLOY TO PRODUCTION OUTSIDE OF THE PIPELINE - do so at your own risk!