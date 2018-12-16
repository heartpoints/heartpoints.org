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
    heartpoints_yarn start
}

heartpoints_prepareForRun() {
    heartpoints_yarn install
    heartpoints_yarn webpack
}

heartpoints_yarn() { local args=$@
    if command_does_not_exist "yarn"; then
        nvm_load
        set +e
        nvm install 
        set -e
        nvm use
        npm install yarn -g
    fi
    yarn ${args}
}

heartpoints_dev_url() {
    echo "http://localhost:5001"
}

heartpoints_onPullRequest() {
    set -e
    heartpoints_prepareForRun
    node src/app.js &
    local heartpointsPID=$!
    sleep 5
    curl "$(heartpoints_dev_url)" --fail
    kill $heartpointsPID
    echo "Success!"
}

heartpoints_onMasterMerge() {
    heartpoints_circleci_deploy
}

heartpoints_production() {
    heartpoints_prepareForRun
    export PORT
    yarn start
}

git_current_branch() {
    echo "$(git rev-parse --abbrev-ref HEAD)"
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

heartpoints_circleci_deploy_details() {
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