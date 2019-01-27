heartpoints.org website
==================================

# Developing this website:


## Prerequisites

Have Docker installed.

## Clone the repository to your development environment

Follow [these instructions](https://help.github.com/articles/fork-a-repo/)
to get a local version of this repository.

## Use the CLI

On a machine with bash shell, use the `./heartpoints.sh` CLI (`./hp` for short) to run various
commands that are useful in the development of heartpoints.org.

To get a list of commands available, just run without arguments: `./hp`

### Run Dev Server

To prepare and run the web server, run:

    ./hp dev

### Deploy to Production

#### Continuous Deployment Automation

Deploys to production shall happen automatically upon merge via CircleCI
(see ./circleci/config.yml).

Note: Deployments require that the `gcr.io/heartpoints-org/cicd` image is available. If you would like to make updates to the image, you may modify `cicd.Dockerfile` and run `./hp buildAndPushCicdImage`. When pushing an update, be sure to find and replace the semver tag with the next version.

#### Manual Deployment

##### Deploy via web

Go to https://circleci.com/gh/heartpoints/heartpoints.org/tree/master, choose a previously run job (you may search the page by the git commit sha), and rerun the workflow.

##### Deploy from Mac

Make sure you have production deployment credentials, then launch the interactive
manual deploy script: `./hp manual_deploy`

Note: only deploys from "master" are allowed.

## Google Cloud

1. There exists a heartpoints.org organization
2. The organization contains a project named heartpoints-org
3. As an admin within the organization
    0. Add an admin if needed by creating an IAM for the user and granting the `Owner` permission
    1. Create a service account "cicd". At the time of this writing, the generated account email is: cicd-353@heartpoints-org.iam.gserviceaccount.com. Important: if you recreate this service account, you must update `cicdServiceAccountEmail()` within heartpoints.sh. Make sure the service account has the following permissions:
        * Kubernetes Engine Admin
        * Service Account User
        * Storage Admin
4. Generate JSON key and add it to the [credentials repository](https://github.com/heartpoints/credentials)
5. Run `./hp createGKECluster`

After the first deployment to GKE, a loadbalancer with an ephemeral IP will be created. Using the Google Console UI, promote this to a static IP named heartpoints-org.

## Next Steps

accounts, accounting equation checks for validity
way for one person to give hp to another person
add expirations to transactions
change how transactions get generated
plot data visually
