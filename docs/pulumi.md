Pulumi
======

With Pulumi, we can use typescript to declare our infrastructure, including docker images that must
be built and run, GCP resources, including our K8s cluster itself, and then k8s resources such as
Ingress, Services, Pods and Secrets.

# Pipeline

1. Make a pulumi change locally
2. Test it (uses your unique username / branch combination automatically)
3. Pull request it
4. Pull request deploys a stack for the pull-request branch
5. Pull request also performs a diff of what would happen in Prod upon merge, posts that to Github
6. Upon merge, the deployment to production occurs

# Clone and Go

The idea is that upon cloning the repository to a windows, mac or other machine capable of running
docker, that one can subsequently run a single command, appropriate to that OS, which in turn
brings up a dev environment, with the minimum host OS couplings possible. 

## Dockerizable Stuff

1. hp serverDev
2. hp clientDev
3. git command line - enforce signed commits
4. pulumi command line
5. gcp command line (may be made redundant by pulumi)
6. kubectl command line (may be made redundant by pulumi)
7. VS Code - see github issue link
8. Add MAC and Windows Dev Env Tests to Circle CI

## Non-Dockerizable Stuff

1. Auto install / call docker / start docker daemon
2. Build docker images needed for stuff if they do not already exist
3. Mount the folders so that autowatchers see them

# Next Steps

1. Can we import our GCP (Domain Registry, DNS, K8s Cluster, K8s Resources) into pulumi code?

# Complete Infrastructure

1. Register domain name (contact info, registrar, account credentials, name server IPs)
2. Create DNS servers (GCP, other clouds)
3. Create Google Administrative User & Organization (assoc with domain name)
4. Create gmail account for administrator (and any other user)
5. Point DNS MX records at gmail server
6. Create GCP project and associate with organization
7. Create Container Registry in GCP to contain our private images
7. Add roles for each user in organization to allow admin
8. Add role(s) for CircleCI to allow it to publish docker images and execute gcp / kubectl commands
9. Somehow set up CircleCI <-> Github link; CircleCI -> CodeCov.io; CodeCov.io <-> Github
10. Set up protected branch status and other settings like that (can this be automated)
9. Create GKE cluster
10. Create Kubernetes Deployment

# Approach / Tactcs

I don't want to mess up heartpoints. I want a totally reproducible setup. So, I suppose what I could do
is slowly create an alternative stack that is its own GCP environmentand just have a different subdomain
that points to that. 

dev.heartpoints.org IN NS [IP of separate DNS server]
www.dev.heartpoints.org IN CNAME @ [dev.heartpoints.org]
@ IN A [IP of newly generated Ingress]

# Thoughts

I keep finding myself creating a bunch of bash to manage all this stuff for the local dev experience. 
Ideally though, I have commands that I can run that just mount local, call into docker, and have all 
the dependencies they need inside the container.

Ideally, the container could also be built from a dockerfile, if there is not already a version
available in a given docker repo.

I don't know what comes first; the CICD, the cloud stuff; can we set up the infrastructure to include
also the CICD pipeline? But does that not create a chicken vs. the egg?

1. Clone repo
2. Run completely local
    1. Build and run kubernetes app using local Docker, minikube, embedded docker registry
        1. with watchers and autoreload
        2. with watchers that create new images and redeploy those
        3. without watchers
3. Run against Cloud
    1. from local
    2. from cicd
        1. pull request
        2. master

## What do I want to do?

When locally developing, i should be able to run a single command to bring up the app in a close-to-production
state. This may or may not have file watchers, and if it does, those may cause reload within running apps or may
retrigger docker builds, causing in turn updated deployments.

Most of this is kubernetes resources, docker images, that must be deployable in minikube, and therefore must
use some docker registry.

Right now I am testing `hp hp_minikubeBuildDeployTest` to see what it does. It seems like this could do all
the work to bring up the minikube vm and link kubectl and docker CLI to it; then once that is complete, we 
would run the pulumi app so that it updates kubernetes

# Tommy and Mike Sunday Pairing Session

1. Minikube version
    1. Pulumify whats there today
    2. Document how to debug logs
    3. Watcher / DevMode
        1. Docker images watch filesystem mounted from mac thru VB into containers and autoreload without
           new docker deployment
        2. Filewatcher causes new docker build, causes updated deployment to minikube
2. Cases for Remote Envs (all should be accessible, perhaps with creds if sensitive, from outside)
    1. Dev time create / destroy env and easily iterate on it from IDE on mac (but remote cluster)
    2. Pull request validation as well as temporarily host PR system for people to click around
    3. On master merge, run tests isolatedly; then deploy canary to production; verify thru
       automated tests. In future, leave box out there to receive certain traffic and if no errors
       after significant traffic, deploy to rest of service.