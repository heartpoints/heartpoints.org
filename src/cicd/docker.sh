#!/usr/bin/env bash

source "src/cicd/git.sh"

ensureDockerCliConfiguredToRunningDaemon() {
    echo "WARN: Please ensure Docker daemon is running if it is not"
}

hp_buildAndTagImage() { local taggedImageName=$1; local shaToReportInHttpHeaders=$2
    ensureDockerCliConfiguredToRunningDaemon
    hp_ensureCommitIsAppropriate
    docker build --build-arg commitSha="${shaToReportInHttpHeaders}" -t ${taggedImageName} .
}

hp_dockerTestImage() { local taggedImageName=$1
    local testName="heartpointsTest"
    trap "docker stop ${testName} > /dev/null" EXIT
    docker run --detach --name "${testName}" --rm "${taggedImageName}"
    sleep 10
    docker exec "${testName}" bash ./heartpoints.sh test localhost:5001
}

hp_dockerBuildTagAndTest() {
    local imageRepo="circleci"
    local shaToBuild="$(git_currentSha)"
    local taggedImageName="$(hp_taggedImageName ${imageRepo} ${shaToBuild})"
    hp_buildAndTagImage "${taggedImageName}" "${shaToBuild}"
    hp_dockerTestImage "${taggedImageName}"
}

hp_taggedImageName() { local imageRepository=$1; local gitSha=$2
    echo "${imageRepository}/heartpoints.org:${gitSha}"
}