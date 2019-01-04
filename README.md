heartpoints.org website
==================================

# Developing this website:

## Clone the repository to your development environment

Follow [these instructions](https://help.github.com/articles/fork-a-repo/)
to get a local version of this repository.

## Use the CLI

On a machine with bash shell, use the `./heartpoints.sh` CLI (`./hp` for short) to run various
commands that are useful in the development of heartpoints.org.

To get a list of commands available, just run without arguments: `./hp`

### Run Dev Server

To prepare and run the web server, run:

    ./heartpoints.sh dev

### Deploy to Production

#### Continuous Deployment Automation

Deploys to production shall happen automatically upon merge via CircleCI
(see ./circleci/config.yml).

#### Manual Deployment

Make sure you have production deployment credentials, then launch the interactive
manual deploy script: `./heartpoints.sh manual_deploy`

Note: only deploys from "master" are allowed.

## Google Cloud

1. There exists a heartpoints.org organization
2. The organization contains a project named heartpoints-org
3. As an admin within the organization
    1. Create a service account "cicd". At the time of this writing, the generated account email is: cicd-353@heartpoints-org.iam.gserviceaccount.com. Important: if you recreate this service account, you must update `cicdServiceAccountEmail()` within heartpoints.sh. Make sure the service account has the following permissions:
        * Kubernetes Engine Admin
        * Service Account User
        * Storage Admin
    2. Create an IAM for mchen@heartpoints.org with the "Owner" permission
4. Generate JSON key and place at the root of this repo. Add to gitignore.
5. Run `./heartpoints.sh createGKECluster` 

## Next Steps

accounts, accounting equation checks for validity
way for one person to give hp to another person
add expirations to transactions
change how transactions get generated
plot data visually
