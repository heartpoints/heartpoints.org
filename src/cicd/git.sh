#!/usr/bin/env bash

source "src/cicd/string.sh"
source "src/cicd/process.sh"

git_safeBranchNameFromIssueDescription() { local issueDescription=$1
    local lowercased="$(string_toLower "${issueDescription}")"
    local maxLength="50"
    local trimmed="$(string_firstNChars "${lowercased}" $maxLength)"
    local spacesReplacedWithDashes="${trimmed// /-}"
    local withoutQuotes="${spacesReplacedWithDashes//\"/}"
    local withoutPoundSignOrLeadingSpace="$(string_everythingAfterChar "${withoutQuotes}" "#")"
    echo $withoutPoundSignOrLeadingSpace
}

gp() {
    git_pullLatestForCurrentBranch
}

git_pullLatestForCurrentBranch() {
    hp_ensureCommitIsAppropriate
    hp_git pull --rebase origin "$(git_currentBranchName)"
}

git_issueDescriptionForIssueId() { local issueId=$1
    echo "$(hp_hub issue | grep "#${issueId} ")"
}

git_safeBranchNameForIssueId() { local issueId=$1
    echo "$(git_safeBranchNameFromIssueDescription "$(git_issueDescriptionForIssueId $issueId)")"
}

git_currentBranchName() { 
    hp_git rev-parse --abbrev-ref HEAD
}

hp_c_help() { echo "Alias for commitUsingIssueDescription"; }
hp_c() {
    hp_commitUsingIssueDescription
}

gitHeadIsDirty() {
    ! hp_git diff-index --quiet HEAD > /dev/null
}

hp_ensureCommitIsAppropriate() {
    if gitHeadIsDirty; then
        errorAndExit "error: uncommitted changes!"
    fi
}

hp_git() { local args="${@}"
    git "${@}"
    # brew_package_run git "${@}"
}

hp_g() { local message=$@ 
    hp_git add -A
    hp_git commit -m "${message}"
}

git_currentSha() {
    echo "$(hp_git rev-parse HEAD)"
}

git_working_directory_is_clean() {
    [ -z "$(hp_git status --porcelain)" ]
}