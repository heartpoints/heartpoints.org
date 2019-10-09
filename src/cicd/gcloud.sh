#!/usr/bin/env bash

source "src/cicd/reflect.sh"
source "src/cicd/brew.sh"

gcloud_install() {
    if command_does_not_exist "gcloud"; then
        hp_brew_cask_install google-cloud-sdk
    fi
}

hp_gcloud() { local args=$@
    #TODO: Should we consider running docker gcloud cli?
    if isMac; then
        hp_brew_cask_run_unmatching_executable google-cloud-sdk gcloud "$@"
    else
        gcloud "$@"
    fi
}

hp_gcr() {
    echo "gcr.io/heartpoints-org"
}