#!/usr/bin/env bash

source "src/cicd/git.sh"
source "src/cicd/reflect.sh"
source "src/cicd/process.sh"
source "src/cicd/string.sh"

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
    #TODO: Test what used to happen in docker build (RUN ./heartpoints.sh cover)
}

hp_dockerTestImage() { local taggedImageName=$1
    hp_docker run -v codeCoverage:codeCoverage --rm "${taggedImageName}" bash ./heartpoints.sh cover
    # local testName="heartpointsTest"
    # trap "docker stop ${testName} > /dev/null" EXIT
    # docker run --detach --name "${testName}" --rm "${taggedImageName}"
    # sleep 10
    # docker exec "${testName}" bash ./heartpoints.sh cover #localhost:5001
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