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
    echo "clientDev                            - run front-end web server with hot reloading"
    echo "createGKECluster                     - creates a GKE cluster. See README for prerequisites"
    echo "hub                                  - use the github cli"
    echo "manualDeploy <gitSha>                - interactive interview to deploy to production"
    echo "minikubeBuild <taggedImageName>      - using minikube's docker daemon, build image and tag with minikube metadata"
    echo "minikubeBuildDeployTest              - minikubeBuild, then minikubeDeployTest"
    echo "minikubeDashboard                    - open minikube dashboard in web browser"
    echo "minikubeDeployTest <taggedImageName> - deploy image to mk and test it (defaults to image for head sha)"
    echo "minikubeDestroyEnvironment           - if minikube dev environment is running, destroys it"
    echo "minikubeOpenWebsite                  - assuming site is running in minikube locally, open web browser to home page"
    echo "minikubeRunTests                     - run tests against an existing minikube-hosted website"
    echo "model                                - outputs a sequence of states describing the evolution of the heartpoints ecosystem"
    echo "prePushVerification                  - validates that local code is ready for pull request"
    echo "serverDev                            - run dev web server locally"
    echo "tailProductionLogs                   - TODO: Need a k8s equivalent (can generate a url if that is a better way to tail)"
    echo "yarn                                 - call the heartpoints-specific version of yarn to add / remove dependencies, etc"
    echo ""
}

error_and_exit() { local errorMessage=$1
    echo $errorMessage
    exit 1
}

heartpoints_localDev() {
    heartpoints_serverDev
    error_and_exit "localDev is deprecated. For server side development, use ./hp serverDev or for client side development use ./hp clientDev"
}

heartpoints_serverDev(){
    heartpoints_prepareForRun
    heartpoints_runServer
}

heartpoints_clientDev(){
    heartpoints_yarn install
    heartpoints_runWebPackDevServer
}

heartpoints_hub() { local args=$@
    heartpoints_hub_install
    hub $args
}

heartpoints_hub_install() {
    brew_install hub
}

brew_install() { local packageName=$1
    if command_does_not_exist "${packageName}"; then
        brew install "$packageName"
    fi
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

heartpoints_runWebPackDevServer(){
    heartpoints_yarn watch
}

ensureDockerCliConfiguredToRunningDaemon() {
    echo "WARN: Please ensure Docker daemon is running if it is not"
}

gitHeadIsDirty() {
    ! git diff-index --quiet HEAD > /dev/null
}

heartpoints_ensureCommitIsAppropriate() {
    if gitHeadIsDirty; then
        errorAndExit "error: uncommitted changes!"
    fi
}

heartpoints_buildAndTagImage() { local taggedImageName=$1; local shaToReportInHttpHeaders=$2
    ensureDockerCliConfiguredToRunningDaemon
    heartpoints_ensureCommitIsAppropriate
    docker build --build-arg commitSha="${shaToReportInHttpHeaders}" -t ${taggedImageName} .
}

heartpoints_dockerTestImage() { local taggedImageName=$1
    local testName="heartpointsTest"
    trap "docker stop ${testName} > /dev/null" EXIT
    docker run --detach --name "${testName}" --rm "${taggedImageName}"
    sleep 10
    docker exec "${testName}" bash ./heartpoints.sh test localhost:5001
}

heartpoints_prePushVerification() {
    heartpoints_minikubeBuildDeployTest
}

heartpoints_onPullRequest() {
    heartpoints_dockerBuildTagAndTest
}

heartpoints_dockerBuildTagAndTest() {
    local imageRepo="circleci"
    local shaToBuild="$(git_currentSha)"
    local taggedImageName="$(heartpoints_taggedImageName ${imageRepo} ${shaToBuild})"
    heartpoints_buildAndTagImage "${taggedImageName}" "${shaToBuild}"
    heartpoints_dockerTestImage "${taggedImageName}"
}

heartpoints_onTestComplete() { local failureOrSuccess=$1
    echo """

    Test Suite ${failureOrSuccess}

    """
}

heartpoints_test() { local baseUrl=$1
    set -e
    trap "heartpoints_onTestComplete failed; false" ERR
    echo "Testing..."
    echo "Test homepage html file is 200..."
    echo "$(curl -L --insecure "${baseUrl}" --fail -o /dev/null)"
    echo "passed"
    echo "" 
    echo "Test bundle.js file is 200..." 
    echo "$(curl -L --insecure "${baseUrl}/bundle.js" --fail -o /dev/null)"
    echo "passed"
    echo "" 
    echo "Test commitSha presence in header matches current sha ($(git_currentSha)):" 
    local headerOutput="$(curl -L --insecure -I "${baseUrl}")"
    echo "$headerOutput"
    echo "$headerOutput" | grep -i "commitSha: $(git_currentSha)"
    echo "passed"
    heartpoints_onTestComplete "passed"
}

heartpoints_onMasterMerge() { export gcpCicdServiceAccountCredentialsJson
    cicdProductionBuildDeployTest
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
    gcloud_cicdAccountLogin
    kubectl_install
    kubectl $args
}

heartpoints_createGKECluster_commands() {
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

heartpoints_runServer() {
    heartpoints_yarn start
}

errorAndExit() { local message=$1
    echo $message
    exit 1
}

heartpoints_gcr() {
    echo "gcr.io/heartpoints-org"
}

heartpoints_manualDeploy() { local gitSha=$1
    requiredParameter "gitSha" "${gitSha}" 
    heartpoints_deployToKubernetes "$(heartpoints_taggedImageName $(heartpoints_gcr) ${gitSha})"
}

stringReplace() { local originalString=$1; local stringToReplace=$2; local stringToPutInItsPlace=$3
    echo "$originalString" | sed "s~${stringToReplace}~${stringToPutInItsPlace}~"
}

fileReplace() { local fileName=$1; local stringToReplace=$2; local stringToPutInItsPlace=$3
    cat "${fileName}" | sed "s~${stringToReplace}~${stringToPutInItsPlace}~"
}

heartpoints_k8sResourceYaml() { local image=$1
    echo "$(fileReplace "heartpoints-k8s.yml" "{{image}}" "${image}")"
}

heartpoints_deployToKubernetes() { local image=$1
    echo "$(heartpoints_k8sResourceYaml "${image}")" | kubectl apply -f -
    echo "deployment request complete... to check status run './heartpoints.sh minikubeDashboard'"
}

heartpoints_pointToAndRunMinikubeDockerDaemon() {
    heartpoints_minikube_start
    eval $(minikube docker-env)
}

heartpoints_taggedImageName() { local imageRepository=$1; local gitSha=$2
    echo "${imageRepository}/heartpoints.org:${gitSha}"
}

heartpoints_manualProductionBuildDeployTest() {
    gcloud_manualLogin
    productionBuildDeployTest
}

cicdProductionBuildDeployTest() {
    gcloud_cicdAccountLogin
    productionBuildDeployTest
}

productionBuildDeployTest() {
    #TODO: DRY up wrt: heartpoints_minikubeBuildDeployTest
    local imageRepository="$(heartpoints_gcr)"
    local shaToBuild="$(git_currentSha)"
    local taggedImageName="$(heartpoints_taggedImageName ${imageRepository} ${shaToBuild})"
    heartpoints_buildAndTagImage "${taggedImageName}" "${shaToBuild}"
    docker push "${taggedImageName}"
    heartpoints_deployToKubernetes "${taggedImageName}"
    heartpoints_testAfterWait heartpoints_test "http://35.244.131.133/" # This refers to the static loadbalancer IP in gcloud
}

errorIfEmpty() { local possiblyEmpty=$1; local errorMessage=$2
    if string_is_empty "${possiblyEmpty}"; then
        errorAndExit "${errorMessage}"
    fi
}

requiredParameter() { local parameterName=$1; local parameterValue=$2
    errorIfEmpty "${parameterValue}" "${parameterName} is required parameter"
}

heartpoints_buildAndPushCicdImage() {
    local imageURI="$(heartpoints_gcr)/cicd:1.0.0"
    docker build -t "$imageURI" -f cicd.Dockerfile .
    gcloud_manualLogin
    docker push "$imageURI"
}

heartpoints_minikubeDeployTest() { local taggedImageName=$1
    requiredParameter "taggedImageName" "${taggedImageName}" 
    heartpoints_deployToKubernetes "${taggedImageName}"
    heartpoints_testAfterWait heartpoints_minikubeRunTests
}

heartpoints_testAfterWait() { local testCommand=$@
    requiredParameter "testCommand" "${testCommand}"
    local minikubeStartupTimout=30
    echo "waiting ${minikubeStartupTimout} seconds before running test"
    sleep ${minikubeStartupTimout}
    $testCommand
}

heartpoints_minikubeBuildDeployTest() {
    local shaToBuild="$(git_currentSha)"
    local taggedImageName="$(heartpoints_minikubeTaggedImageName ${shaToBuild})"
    heartpoints_minikubeBuild "${taggedImageName}" "${shaToBuild}"
    heartpoints_minikubeDeployTest "${taggedImageName}"
}

heartpoints_minikubeTaggedImageName() { local shaToBuild=$1
    requiredParameter "shaToBuild" "${shaToBuild}"
    local imageRepository="minikube"
    echo "$(heartpoints_taggedImageName ${imageRepository} ${shaToBuild})"
}

heartpoints_minikubeBuild() { local taggedImageName=$1; local shaToReportInHttpHeaders=$2
    requiredParameter "taggedImageName" "${taggedImageName}"
    requiredParameter "shaToReportInHttpHeaders" "${shaToReportInHttpHeaders}"
    heartpoints_pointToAndRunMinikubeDockerDaemon
    heartpoints_pointToAndRunMinikubeDockerDaemon
    heartpoints_buildAndTagImage "${taggedImageName}" "${shaToReportInHttpHeaders}"
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

heartpoints_minikubeIngressNotEnabled() {
    ! heartpoints_minikube addons list | grep "ingress: enabled" > /dev/null
}

heartpoints_minikubeEnableIngress() {
    if heartpoints_minikubeIngressNotEnabled; then
        heartpoints_minikube addons enable ingress
    fi
}

heartpoints_minikubeDashboard() {
    heartpoints_minikube dashboard 
}

heartpoints_minikube_start() {
    if ! heartpoints_minikube_isRunning; then
        heartpoints_minikube start
    fi
    heartpoints_minikubeEnableIngress
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

heartpoints_g() { local message=$@ 
    git add -A
    git commit -m "${message}"
}

# Authentication

gcloud_cicdAccountLogin() { export gcpCicdServiceAccountCredentialsJson
    if [ -v gcpCicdServiceAccountCredentialsJson ]; then
        trap "rm gcpCicdServiceAccountCredentialsJson.json" EXIT
        echo "$gcpCicdServiceAccountCredentialsJson" > gcpCicdServiceAccountCredentialsJson.json
        gcloud_cli auth activate-service-account "$(cicdServiceAccountEmail)" --key-file=gcpCicdServiceAccountCredentialsJson.json
        gcloud_configure
    else
        echo "Unable to log into service account - gcpCicdServiceAccountCredentialsJson is not set"
        exit 1
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
    if command_does_not_exist "gcloud"; then
        brew cask install google-cloud-sdk
    fi
}

gcloud_cli() { local args=$@
    gcloud_install   
    gcloud ${args}
}

git_currentSha() {
    echo "$(git rev-parse HEAD)"
}

git_working_directory_is_clean() {
    [ -z "$(git status --porcelain)" ]
}

kubectl_install() {
    brew_install "kubernetes-cli"
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

cicdServiceAccountEmail() {
    echo "cicd-353@heartpoints-org.iam.gserviceaccount.com"
}

heartpoints $@