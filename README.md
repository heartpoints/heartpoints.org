heartpoints.org website
==================================

Welcome to the Heartpoints.org website repository!

If you are an employee, contractor, or volunteer, please visit our internal google drive for internal documents
about the organization [here](https://docs.google.com/document/d/1BZXYQGlBMvy1x8UQ5b8Bco7hyasknCCjdy6DxbKI03Q)

# Developing this website:

## Prerequisites

Have Docker installed.

## Clone the repository to your development environment

Follow [these instructions](https://help.github.com/articles/cloning-a-repository/)
to get a local version of this repository.

## Finding and working on a Github Issue

For a left-to-right issue board view, visit [github.com focus board](https://github.com/heartpoints/heartpoints.org/projects/1)

To view issues from terminal, run:

    ./hp hub issues

To browse to issues master list on the web (different than the left-to-right project view), run:

    ./hp hub browse -- issues

## Create and manage branches

When working on a particular github issue, it is best to do so in a particular branch. Ideally the name of the branch
ties back to the issue. 

### Short Lived Branches!

We want branches to be short lived! No long running branches - get that stuff into master and if its not ready put it
behind a feature switch so other devs can see it and it doesn't get lost or forgotten. Otherwise, delete it!

### Keep Branches Up-To-Date via REBASE (MERGES DISALLOWED!!!)

Branches may not be merged to origin/master from a pull request unless the pull request commits are *properly rebased*, 
please see [this video tutorial](https://www.youtube.com/watch?v=tukOm3Afd8s) or find a similar one to understand the procedure. Use the following command:

    git pull --rebase origin master

### Merge conflicts if necessary

If your changes conflict with the changes you are pulling in, your rebase will not succeed and git will notify you
of conflicts. You can use `git status` to understand what is conflicting, and resolve the conflicts in those files.

When ready, you may `git add -A` to add the files whose conflicts you have resolved, and then once all conflicts have
been resolved, you may run `git rebase --continue` to continue the rebase. 

IMPORTANT: Do not commit accidentally in the middle of a rebase!

### Pushing rebased / non-rebased changes to a branch / pull request

The repository settings will prevent unrebased pull requests from merge, enforcing this best practice for everyone.

If you see the message "This branch is out-of-date with the base branch" then you will need to rebase (see above).

IMPORTANT: DO NOT CLICK THE "Update branch" BUTTON AS IT WILL DO A DIRTY NON-REBASED MERGE

If you receive an error after attempting a push, such as...

    error: failed to push some refs to 'git@github.com:heartpoints/heartpoints.org.git'

you are about to overwrite a remote branch, with its own history of commits; with your
local version of that same branch, which has a different history.

As long as you intend to replace the remote branch's history with your own, then you may
override this error by running `git push origin head --force-with-lease`. As long as you
have recently fetched from the remote, your changes will override the remote. Don't worry,
in a catastrophe, those changes are still recoverable.

WARNING: If you did not recently rebase, but you did receive this error, then you should
be worried. Double check that you are in the branch you think you are in, and that you're
attempting to push to the correct place. Have you already rebased in the latest changes? Double
check everything before force pushing!!!

### Manually Creating a Branch (not recommended)

Follow [these instructions](https://github.com/Kunena/Kunena-Forum/wiki/Create-a-new-branch-with-git-and-manage-branches)
to create and move to a new branch on your local machine.

### Creating a branch for Github Issue Automatically

To create and check out a nice new branch, first, *make sure you have checked out the master branch and pulled the latest from
the remote repository!* 

With that out of the way, given you know your github issue id, run:

    ./hp branch [issueId]
    
This will create a new branch using our heartpoints standard codified naming rules and check you out into that branch. It
will also output hints for how to proceed thereafter.

### Verifying you are in the right branch

Verify you are working within the new branch. Do do so, run:

    git status

## Add and commit Changes to current branch

When you believe your changes are ready, add them to the git workspace with

    git add -A

and then commit them with

    git commit -m "brief description of change"

## Pushing Changes from local branch to remote branch of the same name

and push them with

    git push origin head

## Creating a pull request

Finally, navigate to github.com/heartpoints/heartpoints.org, and look for the prompt to create a new pull request from your newly pushed branch. Here, you can review your changes and if things look good, add any potential code reviewers in the upper right, add an optional explanation in the text box, and click "Create pull request"

You may also pull request using the following:

    `./hp hub pull-request`

You will be taken to the newly created pull request page, where you can see your pull request is automatically tested by the development pipeline. Look for the "Status" or "Details" links on the "Conversation" tab of the pull request to understand what automatic testing jobs are running, and whether they passed or failed (you will see a yellow circle for running, green check for passing, red x for failing)

Once you have passing jobs with green checks and at least one review signoff from a colleague, then, assuming you have the latest changes incorporated into your branch, you will be ready to merge! Click "Squash and Merge" to squash your commits into a single commit for the pull request as a whole, and merge that into master. (If the words "squash and merge" are not visible on the button,
click the down arrow and refine your selection to say squash and merge, then click).

At that point, the pipeline will automatically build, test, deploy, and production verify your change. Master merge pipeline
jobs can be viewed [here](https://circleci.com/gh/heartpoints/heartpoints.org/tree/master). You may also find this link from
github by navigating to the "commits" tab of the main repository page, and clicking the small green / red / yellow status icon
near your merge commit, and following the link.

You can validate your change has made it to production by using the chrome developer tools to inspect the http response headers, looking for the `commitSha` header, which should match the sha of your merged PR commit in master.

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

## Dev Only Site

Navigating to `/dev` on the website will take the visitor to the dev-only
view of heartpoints, where additional features / views may be available.

## Facebook Integration

The app integrates with facebook. To manage the integration, visit https://developers.facebook.com/apps/1010813445640879 (you will need access).

To log in via facebook, navigate to `/dev`

## Google Cloud

1. There exists a heartpoints.org organization
2. The organization contains a project named heartpoints-org
3. As an admin within the organization
    1. Add an admin if needed by creating an IAM for the user and granting the `Owner` permission
    2. Create a service account "cicd". At the time of this writing, the generated account email is: cicd-353@heartpoints-org.iam.gserviceaccount.com. Important: if you recreate this service account, you must update `cicdServiceAccountEmail()` within heartpoints.sh. Make sure the service account has the following permissions:
        * Kubernetes Engine Admin
        * Service Account User
        * Storage Admin
4. Generate JSON key and add it to the [credentials repository](https://github.com/heartpoints/credentials)
5. Run `./hp createGKECluster`

After the first deployment to GKE, a loadbalancer with an ephemeral IP will be created. Using the Google Console UI, promote this to a static IP named heartpoints-org.

## Material UI Theme

Themes can be updated [here](https://in-your-saas.github.io/material-ui-theme-editor/)

## Next Steps

accounts, accounting equation checks for validity
way for one person to give hp to another person
add expirations to transactions
change how transactions get generated
plot data visually
