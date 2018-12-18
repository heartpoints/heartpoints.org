heartpoints.org website
==================================

# Developing this website:

## Clone the repository to your development environment

Follow [these instructions](https://help.github.com/articles/fork-a-repo/)
to get a local version of this repository.

## Use the CLI

On a machine with bash shell, use the `./heartpoints.sh` CLI to run various commands that are useful
in the development of heartpoints.org.

To get a list of commands available, just run without arguments: `./heartpoints.sh`

### Run Dev Server

To prepare and run the web server, run:

    ./heartpoints.sh dev

### Deploy to Production

#### Continuous Deployment Automation

Deploys to production shall happen automatically upon merge via CircleCI
(see ./circleci/config.yml).

#### Manual Deployment

Make sure you have Heroku deployment credentials, then launch the interactive
manual deploy script: `./heartpoints.sh manual_deploy`

Note: only deploys from "master"
are allowed.

## Next Steps

accounts, accounting equation checks for validity
way for one person to give hp to another person
add expirations to transactions
change how transactions get generated
plot data visually

find way to run docker build from within circleci job
publish docker image to heroku using their api stuff
