#!/usr/bin/env bash

source "src/cicd/brew.sh"
source "src/cicd/docker.sh"

hp_credentials_repo_clone_url() {
    echo "git@github.com:heartpoints/credentials.git"
}

remove_credentials_folder() {
    hp_runCommandWithLogCapture removeCredentialsFolder.log rm -rdf credentials
}

hp_credential() { local credentialName=$1
    remove_credentials_folder
    hp_runCommandWithLogCapture gitCloneCredentialsRepo.log hp_git clone "$(hp_credentials_repo_clone_url)"
    cat "credentials/${credentialName}"
    remove_credentials_folder
}

hp_pulumi_access_token() {
     hp_credential "pulumi.token"
}

hp_pulumiWithCICDCred() { local args="$@"
    export PULUMI_ACCESS_TOKEN="$(hp_pulumi_access_token)"
    hp_pulumi "$@"
}

hp_pulumi() { export PULUMI_ACCESS_TOKEN; local args="$@"
    if command_does_not_exist pulumi; then
        hp_docker run -it \
            -e PULUMI_ACCESS_TOKEN \
            -w /app \
            -v $(pwd)/src/pulumi:/app \
            --entrypoint bash \
            pulumi/pulumi:v1.2.0 \
            -c "yarn install && pulumi \"$@\""
    else
        (cd src/pulumi && yarn install && pulumi "$@")
    fi
}