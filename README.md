heartpoints.org website
==================================

# Developing this website:


## Prerequisites

Have Docker installed.

## Clone the repository to your development environment

Follow [these instructions](https://help.github.com/articles/cloning-a-repository/)
to get a local version of this repository.

## Create and manage a new branches

When working on a particular change, it is best to do so in a particular branch.

Follow [these instructions](https://github.com/Kunena/Kunena-Forum/wiki/Create-a-new-branch-with-git-and-manage-branches)
to create and move to a new branch on your local machine.

Verify you are working within the new branch. Do do so, run:

git status

When you believe your changes are ready, add them to the git workspace with

git add -A

and then commit them with

git commit -m "brief description of change"

and push them with

git push origin head

Finally, navigate to github.com/heartpoints/heartpoints.org, and look for the prompt to create a new pull request from your newly pushed branch. Here, you can review your changes and if things look good, add any potential code reviewers in the upper right, add an optional explanation in the text box, and click "Create pull request"

You will be taken to the newly created pull request page, where you can see your pull request is automatically tested by the development pipeline. Look for the "Status" or "Details" links on the "Conversation" tab of the pull request to understand what automatic testing jobs are running, and whether they passed or failed (you will see a yellow circle for running, green check for passing, red x for failing)

Once you have passing jobs with green checks and at least one review signoff from a colleague, then, assuming you have the latest changes incorporated into your branch, you will be ready to merge! Click "Squash and Merge" to squash your commits into a single commit for the pull request as a whole, and merge that into master.

At that point, the pipeline will automatically build, test, deploy, and production verify your change. You can validate your change has made it to production by using the chrome developer tools to inspect the http response headers, looking for the `commitSha` header, which should match the sha of your merged PR commit in master.

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

## Facebook Integration

The app integrates with facebook. To manage the integration, visit https://developers.facebook.com/apps/1010813445640879 (you will need access).

To log in via facebook, navigate to `/#login`

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
