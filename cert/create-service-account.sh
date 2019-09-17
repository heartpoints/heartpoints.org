#!bin/bash

# GCP_PROJECT=$(gcloud config get-value project)
GCP_PROJECT="heartpoints-org"
path=/Users/anushavijay/HeartPoints/google-cloud-sdk/bin/gcloud 
gcloud iam service-accounts create dns-admin \
    --display-name=dns-admin \
    --project=${GCP_PROJECT}

gcloud iam service-accounts keys create ./gcp-dns-admin.json \
    --iam-account=dns-admin@${GCP_PROJECT}.iam.gserviceaccount.com \
    --project=${GCP_PROJECT}

gcloud projects add-iam-policy-binding ${GCP_PROJECT} \
    --member=serviceAccount:dns-admin@${GCP_PROJECT}.iam.gserviceaccount.com \
    --role=roles/dns.admin

kubectl create secret generic cert-manager-credentials \
    --from-file=./gcp-dns-admin.json