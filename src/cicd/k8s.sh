#!/usr/bin/env bash

source "src/cicd/file.sh"
source "src/cicd/cli.sh"
source "src/cicd/git.sh"
source "src/cicd/logging.sh"
source "src/cicd/brew.sh"

hp_deployToKubernetes() { local image=$1
    echo "$(hp_k8sResourceYaml "${image}")" | kubectl apply -f -
    echo "deployment request complete"
}

hp_k8sResourceYaml() { local image=$1
    echo "$(fileReplace "heartpoints-k8s.yml" "{{image}}" "${image}")"
}

hp_pointToAndRunMinikubeDockerDaemon() {
    hp_minikube_start
    pointToMinikubeDockerDaemon    
}

pointToMinikubeDockerDaemon() {
    local dockerEnvCode="$(hp_minikube docker-env)"
    eval $dockerEnvCode
}

hp_dockerMK() { local args="$@"
    hp_pointToAndRunMinikubeDockerDaemon
    hp_docker "$@"
}

hp_minikubeDeployTest_help() { echo "<taggedImageName> - deploy image to mk and test it (defaults to image for head sha)"; }
hp_minikubeDeployTest() { local taggedImageName=$1
    requiredParameter "taggedImageName" "${taggedImageName}" 
    hp_deployToKubernetes "${taggedImageName}"
    hp_testUntilSuccess 120 1 hp_minikubeRunTests
}

hp_minikubeBuildDeployTest_help() { echo "minikubeBuild, then minikubeDeployTest"; }
hp_minikubeBuildDeployTest() {
    local shaToBuild="$(git_currentShaOrTempShaIfDirty)"
    local taggedImageName="$(hp_minikubeTaggedImageName ${shaToBuild})"
    hp_minikubeBuild "${taggedImageName}" "${shaToBuild}"
    hp_minikubeDeployTest "${taggedImageName}"
}

minikubeRegistryHostAndPort() {
    echo "docker.io"
}

#TODO: put general pulumi / k8s stuff in respective files; put HP specific stuff (like below) in a consuming file(s)
hp_minikube_pulumiBuildDeployTest() {
    export shaToBuild="$(git_currentShaOrTempShaIfDirty)"
    export registryHostAndPort="$(minikubeRegistryHostAndPort)"
    export taggedImageName="$(hp_minikubeTaggedImageName ${shaToBuild})"
    hp_pointToAndRunMinikubeDockerDaemon
    hp_pulumi up --stack heartpoints-dev
}

hp_minikubeTaggedImageName() { local shaToBuild=$1
    requiredParameter "shaToBuild" "${shaToBuild}"
    echo "$(hp_taggedImageName $(minikubeRegistryHostAndPort) ${shaToBuild})"
}

hp_minikubeBuild_help() { echo "<taggedImageName> using minikube's docker daemon, build image and tag with minikube metadata"; }
hp_minikubeBuild() { local taggedImageName=$1; local shaToReportInHttpHeaders=$2
    requiredParameter "taggedImageName" "${taggedImageName}"
    requiredParameter "shaToReportInHttpHeaders" "${shaToReportInHttpHeaders}"
    hp_pointToAndRunMinikubeDockerDaemon
    hp_minikube_start
    hp_buildAndTagImage "${taggedImageName}" "${shaToReportInHttpHeaders}"
    hp_dockerTestImage "${taggedImageName}"
}

hp_minikubeDestroyEnvironment_help() { echo "if minikube dev environment is running, destroys it"; }
hp_minikubeDestroyEnvironment() {
    hp_minikube delete
}

hp_urlOfMinikubeWebsite() {
    echo "https://$(hp_minikube ip)"
}

hp_minikubeOpenWebsite_help() { echo "assuming site is running in minikube locally, open web browser to home page"; }
hp_minikubeOpenWebsite() {
    open "$(hp_urlOfMinikubeWebsite)"
}

minikubeInstallLogPath() {
    hp_log_path "mikikube-installation.log"
}

hp_minikube_update() {
    if hp_minikube update-check; then
        hp_brew cask update minikube
    fi
}

hp_minikube() { local args="$@:-"
    virtualbox_install_globally
    hp_brew_cask_run minikube "${@:-}"
}

minikube_addonNotEnabled() { local addonName=$1
    ! hp_minikube addons list | grep "${addonName}: enabled" > /dev/null
}

hp_minikubeAddonEnable() { local addonToEnable=$1
    if minikube_addonNotEnabled "${addonToEnable}"; then
        hp_minikube addons enable "${addonToEnable}"
    fi
}

hp_minikubeEnableIngress() {
    hp_minikubeAddonEnable ingress
}

hp_minikubeEnableDockerRegistry() {
    hp_minikubeAddonEnable registry
}

hp_minikubeDashboard_help() { echo "open minikube dashboard in web browser"; }
hp_minikubeDashboard() {
    hp_minikube dashboard 
}

minikube_vm_memory_mb() {
    echo "8192"
}

hp_minikube_start() {
    if ! hp_minikube_isRunning; then
        #TODO: The --mount stuff is to try to allow pods read/write access for dev env / filewatcher purposes
        #Currently, from within minikube vm cannot write to those locations, there is some permission error.
        # hp_minikube start --memory "$(minikube_vm_memory_mb)" --mount-string="$(pwd):/heartpointsWorkspace" --mount
        hp_minikube start --memory "$(minikube_vm_memory_mb)"
    fi
    hp_minikubeEnableIngress
    hp_minikubeEnableDockerRegistry
}

hp_minikube_stop() {
    if hp_minikube_isRunning; then
        hp_minikube stop
    fi
}

hp_minikube_isRunning() {
    hp_minikube status | runCommandSilently grep "host: Running"
}

hp_kubectl() { local args="$@"
    set -e
    if hp_isMac; then
        brew_package_run "kubernetes-cli" "$@"
    else
        kubectl "$@"
    fi
}