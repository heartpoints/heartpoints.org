#!/usr/bin/env bash

source "src/cicd/brew.sh"
source "src/cicd/docker.sh"
source "src/cicd/credentials.sh"

hp_pulumi_access_token() {
     hp_credential "pulumi.token"
}

hp_pulumiWithCICDCred() { local args="$@"
    export PULUMI_ACCESS_TOKEN="$(hp_pulumi_access_token)"
    hp_pulumi "$@"
}

hp_pulumi_via_docker() { export PULUMI_ACCESS_TOKEN; local args="$@"
    hp_docker run -it \
        -e PULUMI_ACCESS_TOKEN \
        -w /app \
        -v $(pwd)/pulumi:/app \
        --entrypoint bash \
        pulumi/pulumi:v1.2.0 \
        -c "yarn install && pulumi \"$@\""
}

hp_pulumi() { local args="$@"
    if command_does_not_exist pulumi; then
        if hp_isMac; then
            (cd pulumi && runCommandSilently yarn install)
            brew_package_run pulumi --cwd pulumi "$@"
        else
            hp_pulumi_via_docker "$@"
        fi
    else
        (cd pulumi && yarn install)
        pulumi --cwd pulumi "$@"
    fi
}