#!/usr/bin/env bash
set -e

heartpoints() { local command=$1; local remainingArgs=${@:2}
    if string_is_empty "${command}"; then
        heartpoints_help
    else
        heartpoints_${command} $remainingArgs
    fi
}

heartpoints_help() {
    echo ""
    echo "Usage: heartpoints.sh [command]"
    echo ""
    echo "Commands:"
    echo ""
    echo "createGKECluster            - creates a GKE cluster. See README for prerequisites"
    echo "localDev                    - run dev web server locally"
    echo "manualDeploy <gitSha>       - interactive interview to deploy to production"
    echo "minikubeBuildDeployTest     - using minikube's docker daemon, build image, then deploy and test"
    echo "minikubeDestroyEnvironment  - if minikube dev environment is running, destroys it"
    echo "minikubeOpenWebsite         - assuming site is running in minikube locally, open web browser to home page"
    echo "minikubeRunTests            - run tests against an existing minikube-hosted website"
    echo "model                       - outputs a sequence of states describing the evolution of the heartpoints ecosystem"
    echo "prePushVerification         - validates that local code is ready for pull request"
    echo "yarn                        - call the heartpoints-specific version of yarn to add / remove dependencies, etc"
    echo ""
}

heartpoints_localDev() {
    heartpoints_prepareForRun
    heartpoints_runServer
}

heartpoints_prepareForRun() {
    heartpoints_yarn install
    heartpoints_yarn webpack --verbose
    if file_does_not_exist "dist/bundle.js"; then
        echo "dist/bundle.js not found. was webpack successful?"
        exit 1
    fi
}

heartpoints_yarn() { local args=$@
    if command_does_not_exist "yarn"; then
        npm_cli install yarn -g
    fi
    yarn ${args}
}

heartpoints_buildAndTagImage() { local imageURI=$1
    echo "Please ensure Docker daemon is running if it is not"
    docker build --build-arg commitSha="$(git_currentSha)" -t ${imageURI} .
}

heartpoints_dockerTestImage() { local imageURI=$1
    local testName="heartpointsTest"
    trap "docker stop ${testName} > /dev/null" EXIT
    docker run --detach --name "${testName}" --rm "${imageURI}"
    sleep 5
    docker exec "${testName}" bash ./heartpoints.sh test localhost:5001
}

heartpoints_prePushVerification() {
    heartpoints_minikubeBuildDeployTest
}

heartpoints_onPullRequest() {
    heartpoints_dockerBuildTagAndTest
}

heartpoints_dockerBuildTagAndTest() {
    local imageURI="heartpoints.org:$(git_currentSha)"
    heartpoints_buildAndTagImage "${imageURI}"
    heartpoints_dockerTestImage "${imageURI}"
}

heartpoints_onTestComplete() { local failureOrSuccess=$1
    echo """

    Test Suite ${failureOrSuccess} - more details in $(heartpoints_testOutputFile)

    """
}

test_output() { local output=$1
    echo "$output" >> "$(heartpoints_testOutputFile)"
    echo "$output"
}

heartpoints_test() { local baseUrl=$1
    set -e
    trap "heartpoints_onTestComplete failed; false" ERR
    echo "Testing..." > "$(heartpoints_testOutputFile)"
    test_output "Test homepage html file is 200..."
    test_output "$(curl -L --insecure "${baseUrl}" --fail -o /dev/null)"
    test_output "passed"
    test_output "" 
    test_output "Test bundle.js file is 200..." 
    test_output "$(curl -L --insecure "${baseUrl}/bundle.js" --fail -o /dev/null)"
    test_output "passed"
    test_output "" 
    test_output "Test commitSha presence in header matches current sha ($(git_currentSha)):" 
    local headerOutput="$(curl -L --insecure -I "${baseUrl}")"
    test_output "$headerOutput"
    test_output "$headerOutput" | grep -i "commitSha: $(git_currentSha)"
    test_output "passed"
    heartpoints_onTestComplete "passed"
}

heartpoints_onMasterMerge() {
    local imageURI="gcr.io/heartpoints-org/heartpoints.org:$(git_currentSha)"
    heartpoints_buildAndTagImage "${imageURI}"
    heartpoints_pushImage "${imageURI}"
    heartpoints_deploy $(git_currentSha)
    local secondsToWait=45
    echo "waiting ${secondsToWait} seconds for deploy to complete before testing..."
    sleep ${secondsToWait}
    heartpoints_test "http://www.heartpointsfixthis.org" # TODO: fix t his link!!!!!
}

heartpoints_minikubeRunTests() {
    heartpoints_test "$(heartpoints_urlOfMinikubeWebsite)"
}

heartpoints_createGKECluster() {
    withinCloudSDK ./heartpoints.sh createGKECluster_commands
}

withinCloudSDK() { local commands=$@
    docker run -p 8001:8001 -v "$(pwd)":/heartpoints --rm -w /heartpoints google/cloud-sdk:latest $commands
}

heartpoints_gcloud_kubectl() { local args=$@
    withinCloudSDK ./heartpoints.sh kubectl_commands $args
}

heartpoints_kubectl_commands() { local args=$@
    gke_cicdAccountLogin
    gcloud container clusters get-credentials heartpoints-org --zone us-central1-a --project heartpoints-org
    kubectl_install
    kubectl $args
}

heartpoints_createGKECluster_commands() {
    gke_cicdAccountLogin
    gcloud beta container --project "heartpoints-org" \
        clusters create "heartpoints-org" \
        --zone "us-central1-a" \
        --username "admin" \
        --cluster-version "1.11.5-gke.5" \
        --machine-type "g1-small" \
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

heartpoints_runServer() {
    heartpoints_yarn start
}

heartpoints_pushImage() { local imageURI=$1
    gcloud_login #TODO: fix this login to be non-interactive and stuff
    docker push "${imageURI}"
}

heartpoints_manualDeploy() { local gitSha=$1
    gcloud_login
    heartpoints_deployToKubernetes "${gitSha}"
}

heartpoints_deployToKubernetes() { local image=$1
    cat heartpoints-k8s.yml | sed "s/{{image}}/${image}/" | kubectl apply -f -
}

heartpoints_pointToAndRunMinikubeDockerDaemon() {
    heartpoints_minikube_start
    eval $(minikube docker-env)
}

heartpoints_minikubeBuildDeployTest() {
    heartpoints_pointToAndRunMinikubeDockerDaemon
    heartpoints_buildAndTagImage "heartpoints.org:$(git_currentSha)"
    heartpoints_deployToKubernetes "heartpoints.org:$(git_currentSha)"
    local minikubeStartupTimout=30
    echo "deployment complete... waiting ${minikubeStartupTimout} seconds before running test (ctrl+c to safely exit)"
    sleep ${minikubeStartupTimout}
    heartpoints_minikubeRunTests
}

heartpoints_minikubeDestroyEnvironment() {
    heartpoints_minikube delete
}

heartpoints_urlOfMinikubeWebsite() {
    minikube_install > /dev/null 2>&1
    echo "https://$(minikube ip)"
}

heartpoints_minikubeOpenWebsite() {
    open "$(heartpoints_urlOfMinikubeWebsite)"
}

heartpoints_minikube() { local args=$@
    minikube_install
    minikube $args
}

heartpoints_minikube_start() {
    if ! heartpoints_minikube_isRunning; then
        heartpoints_minikube start
        heartpoints_minikube addons enable ingress
    fi
}

heartpoints_minikube_stop() {
    if heartpoints_minikube_isRunning; then
        heartpoints_minikube stop
    fi
}

heartpoints_minikube_isRunning() {
    heartpoints_minikube status | grep "host: Running"
}

heartpoints_model() {
    heartpoints_yarn install
    heartpoints_yarn ts-node src/heartpoints-cli.ts
}

# Authentication


gke_cicdAccountLogin() {
    gcloud_install
    gcloud auth activate-service-account "$(cicdServiceAccountEmail)" --key-file=heartpoints-org-a5b59b6b4963.json
}

gcloud_login() { # this may not be necessary if we use gke_cicdAccountLogin
    gcloud_install
    gcloud auth login # TODO: fix this to be non-interactive!!
    gcloud config set project heartpoints-org
    gcloud auth configure-docker
}

# Misc functions

brew_cask_caskIsInstalled() { local caskName=$1
    brew cask list | grep "${caskName}" > /dev/null 2>&1
}

brew_cask_installCask() { local caskName=$1
    brew_cask_installCaskroom
    if command_does_not_exist "${caskName}"; then
        brew cask install "${caskName}"
    fi
}

brew_cask_installCaskroom() {
    if ! brew info cask &>/dev/null; then
        brew tap caskroom/cask
    fi
}

command_does_not_exist() { local possibleCommand=$1
    ! [ -x "$(command -v ${possibleCommand})" ]
}

file_does_not_exist() { local possibleFilePath=$1
    ! [ -e "${possibleFilePath}" ]
}

gcloud_install() {
    brew cask install google-cloud-sdk 
}

git_currentSha() {
    echo "$(git rev-parse HEAD)"
}

git_working_directory_is_clean() {
    [ -z "$(git status --porcelain)" ]
}

kubectl_install() {
    if command_does_not_exist kubectl; then
        brew install kubernetes-cli
    fi
}

minikube_install() {
    kubectl_install
    virtualbox_install
    if command_does_not_exist minikube; then
        curl -Lo minikube https://storage.googleapis.com/minikube/releases/v0.32.0/minikube-darwin-amd64 && chmod +x minikube && sudo cp minikube /usr/local/bin/ && rm minikube
    fi
}

nodejs_ensureCorrectVersion() {
    if command_does_not_exist "node" || ! strings_are_equal "$(node -v)" "$(cat .nvmrc)"; then
        nvm_installAndUseVersionInNvmRC
    fi
}

npm_cli() { local args=$@
    nodejs_ensureCorrectVersion   
    npm ${args}
}

nvm_download_and_install() {
    touch ~/.bash_profile
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
}

nvm_installAndUseVersionInNvmRC() {
    nvm_load
    set +e
    nvm install 
    set -e
    nvm use
}

nvm_load() {
    if command_does_not_exist "nvm"; then
        if file_does_not_exist "$(nvm_script_path)"; then
            nvm_download_and_install
        fi
        set +e
        nvm_load_existing_nvm
        set -e
    fi
}

nvm_load_existing_nvm() {
    export NVM_DIR="$(nvm_script_dir)"
    [ -s "$(nvm_script_path)" ] && \. "$(nvm_script_path)"
}

nvm_script_dir() {
    echo "$HOME/.nvm"
}

nvm_script_path() {
    echo "$(nvm_script_dir)/nvm.sh"
}

string_is_empty() { local possiblyEmptyString=$1
    [[ -z "${possiblyEmptyString}" ]]
}

strings_are_equal() { local string1=$1; local string2=$2
    [ "${string1}" = "${string2}" ]
}

virtualbox_install() {
    brew_cask_installCask virtualbox
}

# "Variables"

cicdServiceAccountEmail() {
    echo "cicd-353@heartpoints-org.iam.gserviceaccount.com"
}

heartpoints_testOutputFile() {
    echo "test-result.txt"
}

# Entrypoint

heartpoints $@