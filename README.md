heartpoints.org website
==================================

# Developing this website:

## Clone the repository to your development environment

Follow [these instructions](https://help.github.com/articles/fork-a-repo/)
to get a local version of this repository.

## Use the CLI

On a machine with bash shall, use the `./heartpoints.sh` CLI to run various commands that are useful
in the development of heartpoints.org

### Run Dev Server

To prepare and run the web server, run:

    ./heartpoints.sh dev

### Deploy to Production

At the moment heartpoints.org is hosted on heroku. To deploy, make sure you have
a sufficiently privileged user credential handy, and run:

    ./heartpoints.sh deploy

This brief interactive script will deploy. Note: only deploys from "master"
are allowed.