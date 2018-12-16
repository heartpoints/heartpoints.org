heartpoints.org website
==================================

# Developing this website:

## Clone the repository to your development environment

Follow [these instructions](https://help.github.com/articles/fork-a-repo/)
to get a local version of this repository.

## Use the CLI

On a machine with bash shell, use the `./heartpoints.sh` CLI to run various commands that are useful
in the development of heartpoints.org

### Run Dev Server

To prepare and run the web server, run:

    ./heartpoints.sh dev

### Deploy to Production

#### Continuous Deployment Automation

Deploys to production shall happen automatically upon merge via circleci
(see ./circleci/config.yml).

#### Manual Deployment

Make sure you have heroku deployment credentials, then launch the interactive
manual deploy script: `./heartpoints.sh manual_deploy`

Note: only deploys from "master"
are allowed.