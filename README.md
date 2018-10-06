heartpoints.org website
==================================

# Developing this website:

## Clone the repository using Git

First, install the "git" program on your computer. Next use it to
pull down a clone of the shared github workspace. This is a place where 
we keep the shared code for the website:

    git clone https://github.com/heartpoints-org/heartpoints.org.git
    
## Use the CLI

Use the `./heartpoints.sh` CLI to run various commands that are useful
in the development of heartpoints.org

### Run Dev Server

To run a local web server and then pop up a browser window showing the homepage 
for that server, run:

    ./heartpoints.sh dev

### Deploy to Production

At the moment heartpoints.org is hosted on heroku. To deploy, make sure you have
a sufficiently privileged user credential handy, and run:

    ,/heartpoints.sh deploy

This brief interactive script will deploy. Note: only deploys from "master"
are allowed.