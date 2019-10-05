#!/usr/bin/env bash

source "src/cicd/k8s.sh"
source "src/cicd/docker.sh"
source "src/cicd/gke.sh"

hp_prePushVerification_help() { echo "validates that local code is ready for pull request"; }
hp_prePushVerification() {
    hp_minikubeBuildDeployTest
}

hp_onPullRequest() {
    hp_dockerBuildTagAndTest
}

hp_onMasterMerge() { export gcpCicdServiceAccountCredentialsJson
    cicdProductionBuildDeployTest
}

cicdProductionBuildDeployTest() {
    gcloud_cicdAccountLogin
    productionBuildDeployTest
}

productionBuildDeployTest() {
    #TODO: DRY up wrt: hp_minikubeBuildDeployTest
    local imageRepository="$(hp_gcr)"
    local shaToBuild="$(git_currentSha)"
    local taggedImageName="$(hp_taggedImageName ${imageRepository} ${shaToBuild})"
    hp_buildAndTagImage "${taggedImageName}" "${shaToBuild}"
    hp_dockerTestImage "${taggedImageName}"
    hp_docker push "${taggedImageName}"
    hp_deployToKubernetes "${taggedImageName}"
    hp_testUntilSuccess 120 15 hp_test "http://www.heartpoints.org/"
}

hp_manualDeploy_help() { echo "interactive interview to deploy to production"; }
hp_manualDeploy() { local gitSha=$1
    requiredParameter "gitSha" "${gitSha}" 
    hp_deployToKubernetes "$(hp_taggedImageName $(hp_gcr) ${gitSha})"
}

hp_manualProductionBuildDeployTest() {
    gcloud_manualLogin
    productionBuildDeployTest
}

hp_buildAndPushCicdImage() {
    local imageURI="$(hp_gcr)/cicd:1.0.1"
    hp_docker build -t "$imageURI" -f cicd.Dockerfile .
    gcloud_manualLogin
    hp_docker push "$imageURI"
}