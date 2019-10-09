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
    hp_brew_cask_run_unmatching_executable google-cloud-sdk gcloud "$@"
}

hp_gcr() {
    echo "gcr.io/heartpoints-org"
}