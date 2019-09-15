#!/usr/bin/env bash

source "src/cicd/string.sh"
source "src/cicd/git.sh"
source "src/cicd/process.sh"
source "src/cicd/brew.sh"

hub_issueIdOfCurrentBranch() {
    string_everythingBeforeChar "$(git_currentBranchName)" "-"
}

hub_descriptionOfCurrentBranchIssue() {
    git_issueDescriptionForIssueId "$(hub_issueIdOfCurrentBranch)"
}

hub_defaultCommitMessageForCurrentBranch() {
    echo "fixes $(trimLeadingWhitespace "$(hub_descriptionOfCurrentBranchIssue)")"
}

hp_addCommitPushAndPullRequest_help() { echo "adds changes, commits with default description, pushes to remote branch, creates pull request"; }
hp_addCommitPushAndPullRequest() {
    hp_c
    hp_git push origin head
    hp_hub pull-request
}

hp_createPullRequest_help() { echo "create pull request using commit message"; }
hp_createPullRequest() {
    hp_hub pull-request -m "$(hub_defaultCommitMessageForCurrentBranch)"
}

hp_commitUsingIssueDescription() {
    hp_git add -A
    hp_git commit -m "$(hub_defaultCommitMessageForCurrentBranch)"
}

hp_createIssueAndBranch_help() { echo "<issueDescription> - creates branch and issue using provided description, checks out branch"; }
hp_createIssueAndBranch() { local issueDescription=$1
    local issueURL=$(hp_hub issue create -m "${issueDescription}")
    local issueId="$(everythingAfterLastSlash "${issueURL}")"
    echo
    echo "Created issue: ${issueURL}"
    echo
    hp_branch "${issueId}"
}

hp_branch_help() { echo "lists issues, unless issueId provided, then creates branch"; }
hp_branch() { local issueId=$1
    if string_is_empty "$issueId"; then
        hp_hub issue
        echo "Run again with issue number to create and switch to appropriately named branch"
    else
        hp_hub_install
        if strings_are_not_equal "$(git_currentBranchName)" "master"; then
            echo "Error: you are not in the 'master' branch, you are instead in the '$(git_currentBranchName)' branch."
            echo "Before using this command, first switch to master using 'hp git checkout master'"
            echo "After that, make sure you have the latest from the remote master, by running 'hp git pull origin master'"
            echo "With that out of the way, you may run this command to create a new branch"
            errorAndExit " Please try again"
        fi
        local newBranchToPossiblyCreate="$(git_safeBranchNameForIssueId "${issueId}")"
        hp_git checkout -b "${newBranchToPossiblyCreate}"
        echo
        echo "created / switched to branch '${newBranchToPossiblyCreate}'"
        echo
        echo "Use 'hp git add -A' and 'hp git commit -m ' to commit to this branch"
        echo "Use 'hp git push origin head' to push this branch to the remote repository"
        echo "Use 'hp hub pull-request' to create a new pull request from your remote branch to remote master"
        echo "From there, you will receive a URL where you can:"
        echo " - view your change"
        echo " - request reviewers"
        echo " - View the status of automated tests"
        echo
    fi
}

hp_checkoutPullRequest_help() { echo "given pull request number / branch name, check out locally"; }
hp_checkoutPullRequest() { local pullRequestIdOrBranchName=$1
    hp_hub pr checkout "${pullRequestIdOrBranchName}"
}

hp_hub_help() { echo "use the github cli"; }
hp_hub() { local args=$@
    brew_package_run "hub" "$@"
}

hp_hub_install() {
    brew_install hub
}