heartpoints.org Production Environment
======================================

Visit http://www.heartpoints.org/ to see the public website live in production! 

IMPORTANT: More may be visible if you "log in as a developer" by visiting http://www.heartpoints.org/dev and
using your [Heartpoints Facebook Developer Account]()

# Administer Production

To view the status of all the various services, visit Google Cloud Platform at
https://console.cloud.google.com and use your heartpoints credentials.

# GKE Setup

We run production on Google Kubernetes Engine. [Here](docs/gkeSetup.md) is more information about that, including
how to set it up from scratch should that ever be necessary.

# Deploy to Production

## Continuous Deployment Automation

Deploys to production shall happen automatically upon merge via CircleCI
(see ./circleci/config.yml).

Note: Deployments require that the `gcr.io/heartpoints-org/cicd` image is available. If you would like to make 
updates to the image, you may modify `cicd.Dockerfile` and run `./hp buildAndPushCicdImage`. When pushing an update, 
be sure to find and replace the semver tag with the next version.

## Manual Deployment

### Deploy via web

Go to https://circleci.com/gh/heartpoints/heartpoints.org/tree/master, choose a previously run job (you may search 
the page by the git commit sha), and rerun the workflow.

### Deploy from Mac

Make sure you have production deployment credentials, then launch the interactive manual deploy script: 

    ./hp manual_deploy

Note: only deploys from "master" are allowed.