#!/usr/bin/env bash
set -e

heartpoints() { local command=$1; local remainingArgs=${@:2}
    if string_is_empty "${command}"; then
        heartpoints_help
    else
        heartpoints_${command} $remainingArgs
    fi
}

heroku_login() {
    heroku_cli login --interactive
}

heroku_applicationName() {
    echo "heartpoints-org"
}

heartpoints_tailProductionLogs() {
    heroku_login
    heroku_cli logs --app $(heroku_applicationName) --tail
}

heartpoints_help() {
    echo ""
    echo "Usage: heartpoints.sh [command]"
    echo ""
    echo "Commands:"
    echo ""
    echo "dev                   - run dev web server locally"
    echo "manual_deploy         - interactive interview to deploy to production, requires heroku credentials"
    echo "onPullRequest         - validates that a pull request is ready for production"
    echo "tailProductionLogs    - tail the logs from production to see how server is performing"
    echo "model                 - outputs a sequence of states describing the evolution of the heartpoints ecosystem"
    echo "yarn                  - call the heartpoints-specific version of yarn to add / remove dependencies, etc"
    echo ""
}

string_is_empty() { local possiblyEmptyString=$1
    [[ -z "${possiblyEmptyString}" ]]
}

heartpoints_dev() {
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
heartpoints_nodejs_ensureCorrectVersion() {
    nodejs_ensureCorrectVersion
}

nodejs_ensureCorrectVersion() {
    if command_does_not_exist "node" || ! strings_are_equal "$(node -v)" "$(cat .nvmrc)"; then
        nvm_installAndUseVersionInNvmRC
    fi
}

nvm_installAndUseVersionInNvmRC() {
    nvm_load
    set +e
    nvm install 
    set -e
    nvm use
}

npm_cli() { local args=$@
    nodejs_ensureCorrectVersion   
    npm ${args}
}

heartpoints_dev_url() {
    echo "http://localhost:5001"
}

heartpoints_onPullRequest() { export herokuApiKey
    local testName="heartpointsTest"
    trap "docker stop ${testName}" EXIT

    local imageName="heartpoints"
    local nameAndShaTag="registry.heroku.com/$(heroku_applicationName)/${imageName}:$(git_currentSha)"
    docker build -t ${nameAndShaTag} .

    docker run --detach --name "${testName}" --rm "${nameAndShaTag}"
    sleep 5
    docker exec "${testName}" bash ./heartpoints.sh test localhost:5001

    echo "nameAndShaTag: ${nameAndShaTag}"
    echo "herokuApiKey: ${herokuApiKey}"
    docker login --username=tom@cleveweb.com --password=${herokuApiKey} registry.heroku.com
    docker push ${nameAndShaTag}
    echo "Success!"
}

heartpoints_test() { local baseUrl=$1
    set -ex
    curl "${baseUrl}" --fail
    curl "${baseUrl}/bundle.js" --fail
    set +x
}

heartpoints_onMasterMerge() {
    heartpoints_circleci_deploy
    local secondsToWait=45
    echo "waiting ${secondsToWait} seconds for deploy to complete before testing..."
    sleep ${secondsToWait}
    echo "Testing..."
    heartpoints_test "http://www.heartpoints.org"
    echo "Done testing!"
}

heartpoints_runServer() {
    heartpoints_yarn start
}

heartpoints_production() {
    heartpoints_prepareForRun
    export PORT
}

git_current_branch() {
    echo "$(git rev-parse --abbrev-ref HEAD)"
}

git_currentSha() {
    echo "$(git rev-parse HEAD)"
}

git_current_branch_is_master() {
    strings_are_equal "$(git_current_branch)" "master"
}

strings_are_equal() { local string1=$1; local string2=$2
    [ "${string1}" = "${string2}" ]
}

heartpoints_circleci_deploy() {
    heartpoints_general_deploy heartpoints_circleci_deploy_details
}

heartpoints_circleci_deploy_details() { export herokuApiKey
    git push "https://heroku:${herokuApiKey}@git.heroku.com/$(heroku_applicationName).git" master --force
}

heroku_cli() { local args=$@
    if command_does_not_exist heroku; then
        (brew install heroku/brew/heroku)
    fi
    heroku $args
}

heartpoints_general_deploy() { local detailedDeployCommand=$1
    set -e
    if git_working_directory_is_clean && git_current_branch_is_master; then
        $detailedDeployCommand
    else
        echo "Cannot deploy, working directory must be clean and current branch must be master"
        exit 1
    fi
}

heartpoints_manual_deploy() {
    heartpoints_general_deploy heartpoints_manual_deploy_details
}

heartpoints_manual_deploy_details() {
    heroku_login
    heroku_cli git:remote --app $(heroku_applicationName)
    git push heroku head --force
}

heartpoints_model() {
    heartpoints_yarn install
    heartpoints_yarn ts-node src/heartpoints-cli.ts
}

git_working_directory_is_clean() {
    [ -z "$(git status --porcelain)" ]
}

command_does_not_exist() { local possibleCommand=$1
    ! [ -x "$(command -v ${possibleCommand})" ]
}

nvm_script_path() {
    echo "$(nvm_script_dir)/nvm.sh"
}

nvm_script_dir() {
    echo "$HOME/.nvm"
}

nvm_load_existing_nvm() {
    export NVM_DIR="$(nvm_script_dir)"
    [ -s "$(nvm_script_path)" ] && \. "$(nvm_script_path)"
}

file_does_not_exist() { local possibleFilePath=$1
    ! [ -e "${possibleFilePath}" ]
}

nvm_download_and_install() {
    touch ~/.bash_profile
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
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

heartpoints $@