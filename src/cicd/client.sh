#!/usr/bin/env bash

source "src/cicd/yarn.sh"

hp_clientDev_help() { echo "run front-end web server with hot reloading"; }
hp_clientDev(){
    hp_yarn_global install
    hp_runWebPackDevServer
}

hp_runWebPackDevServer(){
    hp_yarn_global watch
}