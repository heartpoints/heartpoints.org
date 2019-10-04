Google Kubernetes Engine (GKE)
==============================

Heartpoints targets the [Kubernetes](https://en.wikipedia.org/wiki/Kubernetes) architecture, so that it 
can be deployed to any cloud service running kubernetes, or onto Minikube, a local kubernetes cluster
that can be run on a laptop.

We have chosen Google's kubernetes offering, called GKE or "Google Kubernetes Engine", which runs
as a set of capabilities within the broader Google Cloud Platform or GCP.

# Administrate / Monitor Production Environment

Please use your heartpoints credentials to log into the following admin tools to manage / monitor production:

- [GKE Admin Home Page](https://console.cloud.google.com/kubernetes/list?project=heartpoints-org)
- [GCP Admin Home Page](https://console.cloud.google.com/home/dashboard?project=heartpoints-org)

# Systems Architecture

We use the idea of [infrastructure as code](https://en.wikipedia.org/wiki/Infrastructure_as_code) to codify
the structure of our production and other environments.

Our [GKE] cluster has a load balancer as defined by our [k8s resources yaml](../heartpoints-k8s.yml),
as an "Ingress". The IP of this load balancer was manually "promoted" to be an external IP address,
allowing it to stay reserved even if we lose the load balancer.

The [DNS records](domain.md) then point to that static IP address.

Underneath the Load Balancer are kubernetes service(s) and pod(s) that serve those services. Pods in turn
run Docker Containers based off of a versioned "image" of the service as it was at a given moment in time.

The [Code Pipeline](codePipeline.md) notices changes to the source code, and when code is merged to master,
the pipeline causes the creation of a new versioned docker image for the service(s) that changed. After
publishing the new versions to our private docker registry in GCP, the pipleline tells Kubernetes to
update its resources, causing the newer version of the image to be run in all the pods. The load balancer
keeps old pods up and running, serving customer requests, until the new pods are ready, and then
gracefully retires the old pods after traffic on them has moved completely to the new pods.

# How to Set up the GCP and GKE Cluster

Since the creation and setup of the cluster are not completely codified, and since some of those steps
may need to be performed in the event of a recovery, we document them here.

1. Login to the [GKE Admin Home Page](https://console.cloud.google.com/kubernetes/list?project=heartpoints-org)
2. Create / find the "heartpoints.org" organization within GCP
3. Create / find a project named "heartpoints-org" and associate it with the Organization
4. Create / find credentials enabling the [Code Pipeline](./codePipeline) to perform GCP / GKE actions on our
   behalf:
    1. Ensure the current user has an IAM "Owner" Role (GCP -> IAM & Admin -> IAM)
    2. Create / ensure a service account "cicd". (GCP -> IAM & Admin -> Service Accounts)
       At the time of this writing, the generated account email is: 
       cicd-353@heartpoints-org.iam.gserviceaccount.com. 
       *IMPORTANT* - if you recreate this service account, you must update `cicdServiceAccountEmail()` within
       [code pipeline](../hp). 
    3. Associate Service Account with these Roles: (GCP -> IAM & Admin -> IAM)
        * Kubernetes Engine Admin
        * Service Account User
        * Storage Admin
    4. Generate JSON Key - this will be used as a credential when the remote CircleCI tooling attempts to
       perform actions under this service account. (GCP -> IAM & Admin -> Service Accounts -> Checkbox -> ...)
       *IMPORTANT* - this key must be kept secure - a copy of the last key that was created has been stored
       in our private, limited access [credentials repository](https://github.com/heartpoints/credentials)
5. Run `./hp createGKECluster` - this will require that you supply the GCP credential from the previous step
   as an environment variable. If run without the credential, a message instructing you how to provide the
   credential will be shown.
6. Promote IP of the GKE-created load balancer to a static IP
   (see: https://cloud.google.com/compute/docs/ip-addresses/reserve-static-external-ip-address#promote_ephemeral_ip)
7. This IP must be added to the DNS records so that traffic for heartpoints.org domains can find its way
   to the load balancer. See: [domain.md](domain.md) for more information on managing DNS records.
8. Ensure CircleCI is set up with the GCP credential from the earlier step so that automatic jobs can authenticate 
   to GCP to do what they need. [see: codePipeline.md](codePipeline.md)
8. Deploy the proper version of the kubernetes resources to the GKE cluster, so that the web server will begin
   running - a simple merge to master should do the trick.