#!/usr/bin/env bash

source "src/cicd/xcode.sh"
source "src/cicd/k8s.sh"
source "src/cicd/yarn.sh"
source "src/cicd/slack.sh"
source "src/cicd/file.sh"

hp_devEnviromentSetup_help()  { echo "use this on Mac OSX to set up everything needed to be an HP dev"; }
hp_devEnviromentSetup() {
    hp_xcode_install
    hp_slack
    hp_minikube
    hp_yarn
}

hp_updateDependencies() {
    hp_yarn
    hp_minikube_update
}

hp_enableHpWithoutDotSlash() {
    echo "export PATH=\"$PATH:.\"" >> "${HOME}/.bash_profile"
    echo "next time you open a terminal, the current directory will be included in your search path,"
    echo "so hp should work when you are in the project root directory"
    echo ""
}

devEnvironmentPath() {
    createAndReturnPath "./devEnvironment"
}