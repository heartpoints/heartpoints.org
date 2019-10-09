#!/usr/bin/env bash

source "src/cicd/k8s.sh"
source "src/cicd/string.sh"
source "src/cicd/docker.sh"

loginAndCreateGkeClusterViaDocker_help() { echo "creates a GKE cluster. See README for prerequisites"; }
loginAndCreateGkeClusterViaDocker() {
    withinCloudSDK ./hp loginAndCreateGkeCluster
}

withinCloudSDK() { local commands=$@
    hp_docker run -p 8001:8001 -v "$(pwd)":/heartpoints --rm -w /heartpoints google/cloud-sdk:latest "$@"
}

hp_gcloud_kubectl() { local args=$@
    withinCloudSDK ./hp kubectlWithinCloudSDK "$@"
}

createGkeCluster() {
    hp_gcloud beta container --project "heartpoints-dev" \
        clusters create "heartpoints-dev" \
        --zone "us-central1-a" \
        --username "admin" \
        --cluster-version "1.11.5-gke.5" \
        --machine-type "n1-standard-1" \
        --image-type "COS" \
        --disk-type "pd-standard" \
        --disk-size "30" \
        --scopes "https://www.googleapis.com/auth/devstorage.read_only","https://www.googleapis.com/auth/logging.write","https://www.googleapis.com/auth/monitoring","https://www.googleapis.com/auth/servicecontrol","https://www.googleapis.com/auth/service.management.readonly","https://www.googleapis.com/auth/trace.append" \
        --num-nodes "1" \
        --enable-stackdriver-kubernetes \
        --enable-ip-alias \
        --network "projects/heartpoints-dev/global/networks/default" \
        --subnetwork "projects/heartpoints-dev/regions/us-central1/subnetworks/default" \
        --default-max-pods-per-node "110" \
        --addons HorizontalPodAutoscaling,HttpLoadBalancing,KubernetesDashboard \
        --enable-autoupgrade \
        --enable-autorepair \
        --maintenance-window "11:00"
}

loginAndCreateGkeCluster() {
    gcloud_cicdAccountLogin
    createGkeCluster
}

kubectlWithinCloudSDK() { local args="$@"
    gcloud_cicdAccountLogin
    kubectl "$@"
}

gcloud_cicd_credential() {
    hp_credential "gcpCicdServiceAccountCredentialsJson.json"
}

gcloud_cicdAccountLoginViaCredsRepo() {
    export gcpCicdServiceAccountCredentialsJson="$(gcloud_cicd_credential)"
    gcloud_cicdAccountLogin
}

gcloudProductionProjectName() {
    echo "heartpoints-org"
}

gcloud_cicdAccountLogin() { export gcpCicdServiceAccountCredentialsJson; local projectName=${1-"$(gcloudProductionProjectName)"}
    if string_is_empty "${gcpCicdServiceAccountCredentialsJson:-}"; then
        echo "Unable to log into service account - gcpCicdServiceAccountCredentialsJson is not set"
        echo "Find the credential at https://github.com/heartpoints/credentials"
        echo "And re-run this script with the above-mentioned environment variable set to that JSON string"
        echo ""
        exit 1
    else
        trap "rm gcpCicdServiceAccountCredentialsJson.json" EXIT
        echo "$gcpCicdServiceAccountCredentialsJson" > gcpCicdServiceAccountCredentialsJson.json
        hp_gcloud auth activate-service-account "$(cicdServiceAccountEmail)" --key-file=gcpCicdServiceAccountCredentialsJson.json
        gcloud_configure "${projectName}"
    fi
}

gcloud_manualLogin() { local projectName=$1
    hp_gcloud auth login
    gcloud_configure "${projectName}"
}

gcloud_configure() { local projectName=$1
    hp_gcloud config set project "${projectName}"
    hp_gcloud auth configure-docker
    hp_gcloud container clusters get-credentials "${projectName}" --zone us-central1-a --project "${projectName}"
}

#TODO: Looks like we would need a different service account to manage the other project
cicdServiceAccountEmail() {
    echo "cicd-353@heartpoints-org.iam.gserviceaccount.com"
}