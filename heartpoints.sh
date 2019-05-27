#!/usr/bin/env bash

heartpoints() { local command=$1; local remainingArgs="${@:2}"
    if string_is_empty "${command}"; then
        hp_help
    else
        local localFunctionName="hp_${command}"
        if function_exists "${localFunctionName}"; then
            $localFunctionName "${@:2}"
        else
            if function_exists $command; then
                $command "${@:2}"
            else
                hp_help
                error_and_exit "Command not found"
            fi
        fi
    fi
}

allFunctionNames() {
    declare -F | awk '{print $NF}' | sort | uniq | grep -v "^_" 
}

function_exists() { local functionName=$1
    type -t $functionName > /dev/null 2>&1
}

hp_help() {
    echo ""
    echo "Usage: heartpoints.sh [command]"
    echo ""
    echo "Commands:"
    echo ""
    functionNamesAndDescriptions
}

error_and_exit() { local errorMessage=$1
    echo $errorMessage
    exit 1
}

functionNamesAndDescriptions() {
    declare -a functionNames=($(publicFunctionNames))
    for fullFunctionName in "${functionNames[@]}"
    do
        local possibleHelp=""
        local possibleHelpFunctionName="${fullFunctionName}_help"
        if function_exists "${possibleHelpFunctionName}"; then
            possibleHelp=" - $(${possibleHelpFunctionName})"
        fi
        local niceFunctionName="$(string_everythingAfterChar "${fullFunctionName}" "_")"
        echo "$(fixStringWidth "${niceFunctionName}" 30)$(fixStringWidth "${possibleHelp}" 80)"
    done
}

publicFunctionNames() {
    allFunctionNames | grep "hp_" | grep -v "_help"
}

stringLength() { local stringInQuestion=$1
    echo ${#stringInQuestion}
}

fixStringWidth() { local originalString=$1; local fixedWidth=$2
    local limitedString="$(string_firstNChars "${originalString}" $fixedWidth)"
    local limitedStringLength="$(stringLength "${limitedString}")"
    local spacesNeeded=$(expr $fixedWidth - $limitedStringLength)
    local spaces="$(padString " " $spacesNeeded)"
    echo "${limitedString}${spaces}"
}

padString() { local stringToPad=$1; local numTimes=$2
    local printFCommand="printf '${stringToPad}%.0s' {0..${numTimes}}"
    eval $printFCommand
}

string_toLower() { local stringToConvertToAllLowercase=$1
    echo "$stringToConvertToAllLowercase" | tr '[:upper:]' '[:lower:]'
}

string_firstNChars() { local sourceString=$1; local n=$2
    echo "${sourceString}" | cut -c 1-$n
}

string_everythingAfterChar() { local sourceString=$1; local delimitingCharacter=$2;
    echo "${sourceString}" | cut -d "${delimitingCharacter}" -f 2- -
}

string_everythingBeforeChar() { local sourceString=$1; local delimitingCharacter=$2;
    cut -d "${delimitingCharacter}" -f 1 <<< "$sourceString"
}

git_safeBranchNameFromIssueDescription() { local issueDescription=$1
    local lowercased="$(string_toLower "${issueDescription}")"
    local maxLength="50"
    local trimmed="$(string_firstNChars "${lowercased}" $maxLength)"
    local spacesReplacedWithDashes="${trimmed// /-}"
    local withoutQuotes="${spacesReplacedWithDashes//\"/}"
    local withoutPoundSignOrLeadingSpace="$(string_everythingAfterChar "${withoutQuotes}" "#")"
    echo $withoutPoundSignOrLeadingSpace
}

get_pullLatestForCurrentBranch() {
    hp_ensureCommitIsAppropriate
    hp_git pull --rebase origin "$(git_currentBranchName)"
}

git_issueDescriptionForIssueId() { local issueId=$1
    echo "$(hp_hub issue | grep "#${issueId} ")"
}

git_safeBranchNameForIssueId() { local issueId=$1
    echo "$(git_safeBranchNameFromIssueDescription "$(git_issueDescriptionForIssueId $issueId)")"
}

git_currentBranchName() { 
    hp_git rev-parse --abbrev-ref HEAD
}

hp_c_help() { echo "Alias for commitUsingIssueDescription"; }
hp_c() {
    hp_commitUsingIssueDescription
}

hub_issueIdOfCurrentBranch() {
    string_everythingBeforeChar "$(git_currentBranchName)" "-"
}

hub_descriptionOfCurrentBranchIssue() {
    git_issueDescriptionForIssueId "$(hub_issueIdOfCurrentBranch)"
}

hub_defaultCommitMessageForCurrentBranch() {
    echo "fixes $(trimLeadingWhitespace "$(hub_descriptionOfCurrentBranchIssue)")"
}

hp_addCommitPushAndPullRequest_help() { echo "adds changes, commits with default description, pushes to remote branch, creates pull request"; }
hp_addCommitPushAndPullRequest() {
    hp_c
    hp_git push origin head
    hp_hub pull-request
}

hp_createPullRequest_help() { echo "create pull request using commit message"; }
hp_createPullRequest() {
    hp_hub pull-request -m "$(hub_defaultCommitMessageForCurrentBranch)"
}

trimAllWhitespace() { local stringToTrim=$1
    echo "${stringToTrim}" | tr -d '[:space:]'
}

trimLeadingWhitespace() { local stringToTrim=$1
    echo "${stringToTrim}" | sed -e 's/^[[:space:]]*//'
}

hp_commitUsingIssueDescription() {
    hp_git add -A
    hp_git commit -m "$(hub_defaultCommitMessageForCurrentBranch)"
}

hp_createIssueAndBranch_help() { echo "<issueDescription> - creates branch and issue using provided description, checks out branch"; }
hp_createIssueAndBranch() { local issueDescription=$1
    local issueURL=$(hp_hub issue create -m "${issueDescription}")
    local issueId="$(everythingAfterLastSlash "${issueURL}")"
    echo
    echo "Created issue: ${issueURL}"
    echo
    hp_branch "${issueId}"
}

everythingAfterLastSlash() { local stringWithSlashes=$1
    echo ${stringWithSlashes##*/}
}

hp_branch_help() { echo "lists issues, unless issueId provided, then creates branch"; }
hp_branch() { local issueId=$1
    if string_is_empty "$issueId"; then
        hp_hub issue
        echo "Run again with issue number to create and switch to appropriately named branch"
    else
        hp_hub_install
        if strings_are_not_equal "$(git_currentBranchName)" "master"; then
            echo "Error: you are not in the 'master' branch, you are instead in the '$(git_currentBranchName)' branch."
            echo "Before using this command, first switch to master using 'hp git checkout master'"
            echo "After that, make sure you have the latest from the remote master, by running 'hp git pull origin master'"
            echo "With that out of the way, you may run this command to create a new branch"
            error_and_exit " Please try again"
        fi
        local newBranchToPossiblyCreate="$(git_safeBranchNameForIssueId "${issueId}")"
        hp_git checkout -b "${newBranchToPossiblyCreate}"
        echo
        echo "created / switched to branch '${newBranchToPossiblyCreate}'"
        echo
        echo "Use 'hp git add -A' and 'hp git commit -m ' to commit to this branch"
        echo "Use 'hp git push origin head' to push this branch to the remote repository"
        echo "Use 'hp hub pull-request' to create a new pull request from your remote branch to remote master"
        echo "From there, you will receive a URL where you can:"
        echo " - view your change"
        echo " - request reviewers"
        echo " - View the status of automated tests"
        echo
    fi
}

hp_checkoutPullRequest_help() { echo "given pull request number / branch name, check out locally"; }
hp_checkoutPullRequest() { local pullRequestIdOrBranchName=$1
    hp_hub pr checkout "${pullRequestIdOrBranchName}"
}

hp_serverDev_help(){ echo "run dev web server locally"; }
hp_serverDev(){
    hp_prepareForRun
    hp_runServer
}

hp_clientDev_help() { echo "run front-end web server with hot reloading"; }
hp_clientDev(){
    hp_yarn_global install
    hp_runWebPackDevServer
}

hp_hub_help() { echo "use the github cli"; }
hp_hub() { local args=$@
    brew_package_run "hub" "$@"
}

hp_brew_clean_help() { echo "cleans brew in case of unexpected install errors"; }
hp_brew_clean() {
    hp_brew update-reset && hp_brew update
    hp_brew doctor
}

hp_hub_install() {
    brew_install hub
}

brew_install() { local packageName=$1
    if command_does_not_exist "${packageName}"; then
        hp_brew install "$packageName"
    fi
}

hp_prepareForRun() { 
    hp_yarn_global install
    hp_yarn_global webpack --verbose
    if file_does_not_exist "dist/bundle.js"; then
        echo "dist/bundle.js not found. was webpack successful?"
        exit 1
    fi
}

hp_yarn() { local args="$@"
    hp_yarn_global "$@"
}

hp_yarn_help() { echo "globally install (if needed) - and then call - yarn dependency manager for nodejs"; }
hp_yarn_global() { local args=$@
    if command_does_not_exist "yarn"; then
        npm_cli install yarn -g
    fi
    yarn "$@"
}

hp_runWebPackDevServer(){
    hp_yarn_global watch
}

ensureDockerCliConfiguredToRunningDaemon() {
    echo "WARN: Please ensure Docker daemon is running if it is not"
}

gitHeadIsDirty() {
    ! hp_git diff-index --quiet HEAD > /dev/null
}

hp_ensureCommitIsAppropriate() {
    if gitHeadIsDirty; then
        errorAndExit "error: uncommitted changes!"
    fi
}

hp_buildAndTagImage() { local taggedImageName=$1; local shaToReportInHttpHeaders=$2
    ensureDockerCliConfiguredToRunningDaemon
    hp_ensureCommitIsAppropriate
    docker build --build-arg commitSha="${shaToReportInHttpHeaders}" -t ${taggedImageName} .
}

hp_dockerTestImage() { local taggedImageName=$1
    local testName="heartpointsTest"
    trap "docker stop ${testName} > /dev/null" EXIT
    docker run --detach --name "${testName}" --rm "${taggedImageName}"
    sleep 10
    docker exec "${testName}" bash ./heartpoints.sh test localhost:5001
}

hp_prePushVerification_help() { echo "validates that local code is ready for pull request"; }
hp_prePushVerification() {
    hp_minikubeBuildDeployTest
}

hp_onPullRequest() {
    hp_dockerBuildTagAndTest
}

hp_unitTest_help() { echo "run the mocha unit tests, which test without build / deploy"; }
hp_unitTest() { local args="$@"
    hp_yarn_global ts-mocha src/tests/**/*.ts "$@"
}

hp_dockerBuildTagAndTest() {
    local imageRepo="circleci"
    local shaToBuild="$(git_currentSha)"
    local taggedImageName="$(hp_taggedImageName ${imageRepo} ${shaToBuild})"
    hp_buildAndTagImage "${taggedImageName}" "${shaToBuild}"
    hp_dockerTestImage "${taggedImageName}"
}

hp_onTestComplete() { local failureOrSuccess=$1
    echo """

    Test Suite ${failureOrSuccess}

    """
}

hp_test() { local baseUrl=$1
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
    local headerOutput="$(curl -L --insecure -I "${baseUrl}?preventCache=$(date +%s)")"
    echo "$headerOutput"
    if echo "$headerOutput" | grep -i "commitSha: $(git_currentSha)"; then
        hp_onTestComplete "passed"
    else
        hp_onTestComplete "failed"
        return 1
    fi
}

hp_onMasterMerge() { export gcpCicdServiceAccountCredentialsJson
    cicdProductionBuildDeployTest
}

hp_minikubeRunTests_help() { echo "run tests against an existing minikube-hosted website"; }
hp_minikubeRunTests() {
    hp_test "$(hp_urlOfMinikubeWebsite)"
}

hp_createGKECluster_help() { echo "creates a GKE cluster. See README for prerequisites"; }
hp_createGKECluster() {
    withinCloudSDK ./heartpoints.sh createGKECluster_commands
}

withinCloudSDK() { local commands=$@
    docker run -p 8001:8001 -v "$(pwd)":/heartpoints --rm -w /heartpoints google/cloud-sdk:latest "$@"
}

hp_gcloud_kubectl() { local args=$@
    withinCloudSDK ./heartpoints.sh kubectl_commands "$@"
}

hp_kubectl_commands() { local args=$@
    gcloud_cicdAccountLogin
    kubectl_install
    kubectl "$@"
}

hp_createGKECluster_commands() {
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

hp_runServer() {
    hp_yarn_global start
}

errorAndExit() { local message=$1
    echo $message
    exit 1
}

hp_gcr() {
    echo "gcr.io/heartpoints-org"
}

hp_manualDeploy_help() { echo "interactive interview to deploy to production"; }
hp_manualDeploy() { local gitSha=$1
    requiredParameter "gitSha" "${gitSha}" 
    hp_deployToKubernetes "$(hp_taggedImageName $(hp_gcr) ${gitSha})"
}

stringReplace() { local originalString=$1; local stringToReplace=$2; local stringToPutInItsPlace=$3
    echo "$originalString" | sed "s~${stringToReplace}~${stringToPutInItsPlace}~"
}

fileReplace() { local fileName=$1; local stringToReplace=$2; local stringToPutInItsPlace=$3
    cat "${fileName}" | sed "s~${stringToReplace}~${stringToPutInItsPlace}~"
}

hp_k8sResourceYaml() { local image=$1
    echo "$(fileReplace "heartpoints-k8s.yml" "{{image}}" "${image}")"
}

hp_deployToKubernetes() { local image=$1
    echo "$(hp_k8sResourceYaml "${image}")" | kubectl apply -f -
    echo "deployment request complete... to check status run './heartpoints.sh minikubeDashboard'"
}

hp_pointToAndRunMinikubeDockerDaemon() {
    hp_minikube_start
    eval $(minikube docker-env)
}

hp_taggedImageName() { local imageRepository=$1; local gitSha=$2
    echo "${imageRepository}/heartpoints.org:${gitSha}"
}

hp_manualProductionBuildDeployTest() {
    gcloud_manualLogin
    productionBuildDeployTest
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
    docker push "${taggedImageName}"
    hp_deployToKubernetes "${taggedImageName}"
    hp_testUntilSuccess 120 15 hp_test "http://35.244.131.133/" # This refers to the static loadbalancer IP in gcloud
}

errorIfEmpty() { local possiblyEmpty=$1; local errorMessage=$2
    if string_is_empty "${possiblyEmpty}"; then
        errorAndExit "${errorMessage}"
    fi
}

requiredParameter() { local parameterName=$1; local parameterValue=$2
    errorIfEmpty "${parameterValue}" "${parameterName} is required parameter"
}

hp_buildAndPushCicdImage() {
    local imageURI="$(hp_gcr)/cicd:1.0.1"
    docker build -t "$imageURI" -f cicd.Dockerfile .
    gcloud_manualLogin
    docker push "$imageURI"
}

hp_minikubeDeployTest_help() { echo "<taggedImageName> - deploy image to mk and test it (defaults to image for head sha)"; }
hp_minikubeDeployTest() { local taggedImageName=$1
    requiredParameter "taggedImageName" "${taggedImageName}" 
    hp_deployToKubernetes "${taggedImageName}"
    hp_testUntilSuccess 120 15 hp_minikubeRunTests
}

hp_testUntilSuccess() { local timeoutSeconds=$1; local interval=$2; local testCommand=${@:3}
    timer=0
    while true; do
        if "${@:3}"; then
            break
        elif [ $timer -ge $timeoutSeconds ]; then
            echo "Maximum retries exceeded. Test failed"
            exit 1
        fi
        echo "Test failed. A total of $timer seconds have elapsed. Attempting again after $interval seconds..."
        timer=$(($timer+$interval))
        sleep $interval
    done
}

hp_minikubeBuildDeployTest_help() { echo "minikubeBuild, then minikubeDeployTest"; }
hp_minikubeBuildDeployTest() {
    local shaToBuild="$(git_currentSha)"
    local taggedImageName="$(hp_minikubeTaggedImageName ${shaToBuild})"
    hp_minikubeBuild "${taggedImageName}" "${shaToBuild}"
    hp_minikubeDeployTest "${taggedImageName}"
}

hp_minikubeTaggedImageName() { local shaToBuild=$1
    requiredParameter "shaToBuild" "${shaToBuild}"
    local imageRepository="minikube"
    echo "$(hp_taggedImageName ${imageRepository} ${shaToBuild})"
}

hp_devEnviromentSetup_help()  { echo "use this on Mac OSX to set up everything needed to be an HP dev"; }
hp_devEnviromentSetup() {
    hp_xcode_install
    hp_slack
    hp_minikube
    hp_yarn
}

hp_minikubeBuild_help() { echo "<taggedImageName> using minikube's docker daemon, build image and tag with minikube metadata"; }
hp_minikubeBuild() { local taggedImageName=$1; local shaToReportInHttpHeaders=$2
    requiredParameter "taggedImageName" "${taggedImageName}"
    requiredParameter "shaToReportInHttpHeaders" "${shaToReportInHttpHeaders}"
    hp_pointToAndRunMinikubeDockerDaemon
    hp_buildAndTagImage "${taggedImageName}" "${shaToReportInHttpHeaders}"
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

hp_log_path() { local remainingPath=$1
    local logFile="$(createAndReturnPath "$(devEnvironmentPath)/logs")/${remainingPath}"
    touch "${logFile}"
    echo "${logFile}"
}

brew_package_run() { local packageName=$1; local args="${@:2}"
    local brewPackagePath="$(brew_package_path ${packageName})"
    if command_does_not_exist "${brewPackagePath}"; then
        hp_brew install "${packageName}" > "$(hp_log_path "brewPackageInstall_${packageName}.log")" 2>&1
    fi
    "${brewPackagePath}" "${@:2}"
}

brew_package_path() { local packageName=$1;
    echo "$(hp_brew --prefix "${packageName}")/bin/${packageName}"
}

hp_slack() {
    set -e
    hp_brew_cask_install "slack"
    echo "Slack is installed / installing. Please use CTRL+space on Mac and search for 'slack' to use it"
    echo "NOTE: Slack may take a moment before it is available, if it was not previously installed."
    echo ""
}

createAndReturnPath() { local path=$1
    mkdir -p "${path}"
    echo "${path}"
}

minikubeInstallLogPath() {
    hp_log_path "mikikube-installation.log"
}

hp_minikube_update() {
    if hp_minikube update-check; then
        hp_brew cask update minikube
    fi
}

hp_updateDependencies() {
    hp_yarn
    hp_minikube_update
}

brew_cask_cellar_path() {
    createAndReturnPath "$(homebrew_install_dir)/Cellar"
}

hp_brew_cask_install() { local caskName=$1; local options="${@:2}"
    if hp_brew_cask_notInstalled "${caskName}"; then
        brew_cask_cellar_path > /dev/null
        hp_brew cask install ${caskName} "${@:2}" > "$(hp_log_path caskInstall_${caskName}.log)" 2>&1
    fi
}

hp_brew_cask_run() { local caskName=$1; local args="${@:2}"
    hp_brew_cask_install "${caskName}"
    "$(homebrew_bin_path "${caskName}")" "${@:2}"
}

hp_brew_cask_notInstalled() { local caskName=$1
    hp_brew cask info "${caskName}" 2>&1 | grep "Not installed" > /dev/null
}

hp_minikube() { local args=$@
    virtualbox_install_globally
    hp_brew_cask_run minikube "${@}"
}

hp_minikubeIngressNotEnabled() {
    ! hp_minikube addons list | grep "ingress: enabled" > /dev/null
}

hp_minikubeEnableIngress() {
    if hp_minikubeIngressNotEnabled; then
        hp_minikube addons enable ingress
    fi
}

hp_minikubeDashboard_help() { echo "open minikube dashboard in web browser"; }
hp_minikubeDashboard() {
    hp_minikube dashboard 
}

hp_minikube_start() {
    if ! hp_minikube_isRunning; then
        hp_minikube start
    fi
    hp_minikubeEnableIngress
}

hp_minikube_stop() {
    if hp_minikube_isRunning; then
        hp_minikube stop
    fi
}

hp_git() { local args="${@}"
    git "${@}"
    # brew_package_run git "${@}"
}

hp_minikube_isRunning() {
    hp_minikube status | grep "host: Running"
}

hp_model() {
    hp_yarn_global install
    hp_yarn_global ts-node src/heartpoints-cli.ts
}

hp_g() { local message=$@ 
    hp_git add -A
    hp_git commit -m "${message}"
}

hp_enableHpWithoutDotSlash() {
    echo "export PATH=\"$PATH:.\"" >> "${HOME}/.bash_profile"
    echo "next time you open a terminal, the current directory will be included in your search path,"
    echo "so hp should work when you are in the project root directory"
    echo ""
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

brew_app_dir_path() {
    createAndReturnPath "$(devEnvironmentPath)/brewAppDir"
}

devEnvironmentPath() {
    createAndReturnPath "./devEnvironment"
}

hp_brew() { local args="$@"
    if command_does_not_exist "$(homebrew_cli_path)"; then
        brew_install_brew_itself
    fi
    $(homebrew_cli_path) "$@"
}

homebrew_cli_path() {
    homebrew_bin_path brew
}

homebrew_bin_path() { local caskOrPackageName=$1
    echo "$(homebrew_install_dir)/bin/${caskOrPackageName}"
}

homebrew_install_dir() {
    createAndReturnPath "$(devEnvironmentPath)/homebrew"
}

homebrew_tar_path() {
    createAndReturnPath "$(devEnvironmentPath)/homebrewTar"
}

homebrew_tar_download_log_path() {
    hp_log_path "homebrew_tar_download.log"
}

brew_install_log_path() {
    hp_log_path "brew_install_brew_itself.log"
}

brew_install_brew_itself() {
    local tarFilePath="$(homebrew_tar_path)/hombrew.zip"
    curl -L https://github.com/Homebrew/brew/tarball/master --output "${tarFilePath}" > "$(homebrew_tar_download_log_path)" 2>&1 
    cat "${tarFilePath}" | tar xz --strip 1 -C "$(homebrew_install_dir)" 2>&1 | tee "$(hp_log_path homebrew_unzip.log)"
}

hp_xcode_install() {
    local commandLineToolsPath="/Library/Developer/CommandLineTools"
    mkdir -p "${commandLineToolsPath}"
    sudo rm -rf "${commandLineToolsPath}"
    xcode-select --install
    sudo xcode-select -s /Applications/Xcode.app/
    softwareupdate --install Xcode
}

command_does_not_exist() { local possibleCommand=$1
    ! [ -x "$(command -v ${possibleCommand})" ]
}

file_does_not_exist() { local possibleFilePath=$1
    ! [ -e "${possibleFilePath}" ]
}

gcloud_install() {
    if command_does_not_exist "gcloud"; then
        hp_brew_cask_install google-cloud-sdk
    fi
}

hp_isMac() {
    strings_are_equal "$(uname)" "Darwin" > /dev/null
}

gcloud_cli() { local args=$@
    gcloud_install   
    gcloud "$@"
}

git_currentSha() {
    echo "$(hp_git rev-parse HEAD)"
}

git_working_directory_is_clean() {
    [ -z "$(hp_git status --porcelain)" ]
}

hp_kubectl() { local args="$@"
    set -e
    if hp_isMac; then
        brew_package_run "kubernetes-cli" "$@"
    else
        kubectl "$@"
    fi
}

nodejs_ensureCorrectVersion() {
    if command_does_not_exist "node" || ! strings_are_equal "$(node -v)" "$(cat .nvmrc)"; then
        nvm_installAndUseVersionInNvmRC
    fi
}

npm_cli() { local args=$@
    nodejs_ensureCorrectVersion   
    npm "$@"
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
    createAndReturnPath "$HOME/.nvm"
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

strings_are_not_equal() { local string1=$1; local string2=$2
    ! strings_are_equal "${string1}" "${string2}"
}

virtualbox_install_globally() {
    hp_brew_cask_install virtualbox --force --verbose --debug
}

cicdServiceAccountEmail() {
    echo "cicd-353@heartpoints-org.iam.gserviceaccount.com"
}

heartpoints "$@"