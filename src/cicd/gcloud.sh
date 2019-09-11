#!/usr/bin/env bash

source "src/cicd/reflect.sh"
source "src/cicd/brew.sh"

gcloud_install() {
    if command_does_not_exist "gcloud"; then
        hp_brew_cask_install google-cloud-sdk
    fi
}

gcloud_cli() { local args=$@
    gcloud_install   
    gcloud "$@"
}

hp_gcr() {
    echo "gcr.io/heartpoints-org"
}