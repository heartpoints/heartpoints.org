#!/usr/bin/env bash

source "src/cicd/git.sh"
source "src/cicd/reflect.sh"
source "src/cicd/process.sh"
source "src/cicd/string.sh"
source "src/cicd/mac.sh"

hp_docker() { local args="$@"
    local error="ERROR: CICD requires docker CLI installed, and docker daemon running."
    if command_does_not_exist "docker"; then
        errorAndExit "ERROR: CICD requires docker CLI installed"
    else
        if stringContains "Is the docker daemon running" "$(docker info 2>&1)"; then
            errorAndExit "Docker CLI available, but daemon is not. On MAC: CMD+SPACE, find docker, click. Then retry"
        else
            docker "${@}"
        fi
    fi
}

hp_buildAndTagImage() { local taggedImageName=$1; local shaToReportInHttpHeaders=$2
    hp_ensureCommitIsAppropriate
    hp_docker build --build-arg commitSha="${shaToReportInHttpHeaders}" -t ${taggedImageName} .
}

hp_dockerTestImage() { local taggedImageName=$1
    local coveragePath="$(createAndReturnPath "$(pwd)/coverage")"
    hp_docker run --rm "${taggedImageName}" bash -e CODECOV_TOKEN ./heartpoints.sh cover
}

hp_imageRepoName() {
    stringTernary hp_isMac "mac" "circleci"
}

hp_dockerBuildTagAndTest() {
    local shaToBuild="$(git_currentSha)"
    local taggedImageName="$(hp_taggedImageName $(hp_imageRepoName) ${shaToBuild})"
    hp_buildAndTagImage "${taggedImageName}" "${shaToBuild}"
    hp_dockerTestImage "${taggedImageName}"
}

hp_taggedImageName() { local imageRepository=$1; local gitSha=$2
    echo "${imageRepository}/heartpoints.org:${gitSha}"
}