#!/usr/bin/env bash

source "src/cicd/yarn.sh"
source "src/cicd/file.sh"

hp_serverDev_help(){ echo "run dev web server locally"; }
hp_serverDev(){
    hp_prepareForRun
    hp_runServer
}

hp_prepareForRun() { 
    hp_yarn_global install
    hp_yarn_global webpack --verbose
    if file_does_not_exist "dist/bundle.js"; then
        echo "dist/bundle.js not found. was webpack successful?"
        exit 1
    fi
}

hp_runServer() {
    hp_yarn_global start
}