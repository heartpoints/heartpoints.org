#!/usr/bin/env bash

source "src/cicd/k8s.sh"
source "src/cicd/string.sh"
source "src/cicd/docker.sh"

hp_createGKECluster_help() { echo "creates a GKE cluster. See README for prerequisites"; }
hp_createGKECluster() {
    withinCloudSDK ./hp createGKEClusterFromWithinCloudSDK
}

withinCloudSDK() { local commands=$@
    hp_docker run -p 8001:8001 -v "$(pwd)":/heartpoints --rm -w /heartpoints google/cloud-sdk:latest "$@"
}

hp_gcloud_kubectl() { local args=$@
    withinCloudSDK ./hp kubectlWithinCloudSDK "$@"
}

createGKEClusterFromWithinCloudSDK() {
    gcloud_cicdAccountLogin
    gcloud_cli beta container --project "heartpoints-org" \
        clusters create "heartpoints-org" \
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
        --network "projects/heartpoints-org/global/networks/default" \
        --subnetwork "projects/heartpoints-org/regions/us-central1/subnetworks/default" \
        --default-max-pods-per-node "110" \
        --addons HorizontalPodAutoscaling,HttpLoadBalancing,KubernetesDashboard \
        --enable-autoupgrade \
        --enable-autorepair \
        --maintenance-window "11:00"
}

kubectlWithinCloudSDK() { local args="$@"
    gcloud_cicdAccountLogin
    kubectl "$@"
}

gcloud_cicdAccountLogin() { export gcpCicdServiceAccountCredentialsJson
    if string_is_empty "${gcpCicdServiceAccountCredentialsJson}"; then
        echo "Unable to log into service account - gcpCicdServiceAccountCredentialsJson is not set"
        echo "Find the credential at https://github.com/heartpoints/credentials"
        echo "And re-run this script with the above-mentioned environment variable set to that JSON string"
        echo ""
        exit 1
    else
        trap "rm gcpCicdServiceAccountCredentialsJson.json" EXIT
        echo "$gcpCicdServiceAccountCredentialsJson" > gcpCicdServiceAccountCredentialsJson.json
        gcloud_cli auth activate-service-account "$(cicdServiceAccountEmail)" --key-file=gcpCicdServiceAccountCredentialsJson.json
        gcloud_configure
    fi
}

gcloud_manualLogin() {
    gcloud_cli auth login
    gcloud_configure
}

gcloud_configure() {
    gcloud_cli config set project heartpoints-org
    gcloud_cli auth configure-docker
    gcloud_cli container clusters get-credentials heartpoints-org --zone us-central1-a --project heartpoints-org
}

cicdServiceAccountEmail() {
    echo "cicd-353@heartpoints-org.iam.gserviceaccount.com"
}