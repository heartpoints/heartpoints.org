GKE Setup
=========

Heartpoints webserver is packaged as a docker image. We deploy that image to a 
[Kubernetes](https://en.wikipedia.org/wiki/Kubernetes) cluster, which at present can be run locally (via minikube),
but for production purposes we use GKE (Google's Hosted Kubernetes Engine).

While the production GKE cluster should already be running, this document serves to show how it was set up, such that 
it should be able to be recreated from scratch in the event of a catastrophe.

## Steps to (re)create the heartpoints-ready GKE cluster and deployment-ready production environment

1. There exists a heartpoints.org organization
2. The organization contains a project named heartpoints-org
3. As an admin within the organization
    1. Add an admin if needed by creating an IAM for the user and granting the `Owner` permission
    2. Create a service account "cicd". At the time of this writing, the generated account email is: 
    cicd-353@heartpoints-org.iam.gserviceaccount.com. Important: if you recreate this service account, you must 
    update `cicdServiceAccountEmail()` within heartpoints.sh. Make sure the service account has the following 
    permissions:
        * Kubernetes Engine Admin
        * Service Account User
        * Storage Admin
4. Generate JSON key and add it to the [credentials repository](https://github.com/heartpoints/credentials)
5. Run `./hp createGKECluster`

After the first deployment to GKE, a loadbalancer with an ephemeral IP will be created. Using the Google Console UI, 
promote this to a static IP named heartpoints-org.

Our DNS (hosted at godaddy) is set up with an A record directing all traffic from heartpoints.org and 
www.heartpoints.org to the static IP that was created during the most recent time the production environment was
created.