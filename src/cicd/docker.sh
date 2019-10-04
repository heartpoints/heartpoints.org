#!/usr/bin/env bash

source "src/cicd/git.sh"
source "src/cicd/reflect.sh"
source "src/cicd/process.sh"
source "src/cicd/string.sh"
source "src/cicd/mac.sh"

hp_docker() { local args="$@"
    if command_does_not_exist "docker"; then
        errorAndExit "ERROR: Docker CLI not found" \
            " To address this, you may either:" \
            " - attempt again in a different environment, or" \
            " - install docker (see: https://docs.docker.com/v17.12/install/) and try again"
    else
        local dockerInfo="$(combineOutputStreams docker info)"
        if stringContains "Is the docker daemon running" "${dockerInfo}"; then
            errorAndExit "Docker CLI available, but daemon is not." \
                " On MAC: CMD+SPACE, find docker, click. Then retry." \
                " Raw Docker Info: ${dockerInfo}"
        else
            docker "$@"
        fi
    fi
}

hp_buildAndTagImage() { local taggedImageName=$1; local shaToReportInHttpHeaders=$2
    hp_ensureCommitIsAppropriate
    hp_docker build --build-arg commitSha="${shaToReportInHttpHeaders}" -t ${taggedImageName} .
}

hp_dockerTestImage() { local taggedImageName=$1
    local coveragePath="$(createAndReturnPath "$(pwd)/coverage")"
    local ci_env=`bash <(curl -s https://codecov.io/env)`
    echo "CI environment getting passed to test container: ${ci_env}"
    echo "taggedImageName to run: ${taggedImageName}"
    #TODO: This got called during my minikube run - we do not want to cover necessarily (although, why didn't it work)
    hp_docker run ${ci_env} -e CODECOV_TOKEN  --rm "${taggedImageName}" bash ./heartpoints.sh cover
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