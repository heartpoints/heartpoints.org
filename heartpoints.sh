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
    echo "manualDeploy <gitSha> - interactive interview to deploy to production (will prompt for heroku credentials)"
    echo "prePushVerification   - validates that local code is ready for pull request"
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

heartpoints_buildAndTagImage() { local imageURI=$1
    docker build --build-arg commitSha="$(git_commitSha)" -t ${imageURI} .
}

heartpoints_testImage() { local imageURI=$1
    local testName="heartpointsTest"
    trap "docker stop ${testName} > /dev/null" EXIT
    docker run --detach --name "${testName}" --rm "${imageURI}"
    sleep 5
    docker exec "${testName}" bash ./heartpoints.sh test localhost:5001
}

heartpoints_prePushVerification() {
    heartpoints_buildTagAndTest
}

heartpoints_onPullRequest() {
    heartpoints_buildTagAndTest
}

heartpoints_buildTagAndTest() {
    local imageURI="heartpoints.org:$(git_commitSha)"
    heartpoints_buildAndTagImage "${imageURI}"
    heartpoints_testImage "${imageURI}"
}

heartpoints_test() { local baseUrl=$1
    echo "Testing..."
    set -e
    curl "${baseUrl}" --fail
    curl "${baseUrl}/bundle.js" --fail
    curl -I "${baseUrl}" | grep -i "commitSha: $(git_commitSha)"
    echo "Test successful!"
}

heartpoints_onMasterMerge() { export herokuApiKey
    local imageURI="registry.heroku.com/$(heroku_applicationName)/web:$(git_commitSha)"
    heartpoints_buildAndTagImage "${imageURI}"
    heartpoints_pushImage "${imageURI}" "${herokuApiKey}"
    heartpoints_deploy $(git_commitSha) "${herokuApiKey}"
    local secondsToWait=45
    echo "waiting ${secondsToWait} seconds for deploy to complete before testing..."
    sleep ${secondsToWait}
    heartpoints_test "http://www.heartpoints.org"
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

git_commitSha() {
    echo "$(git rev-parse HEAD)"
}

git_current_branch_is_master() {
    strings_are_equal "$(git_current_branch)" "master"
}

strings_are_equal() { local string1=$1; local string2=$2
    [ "${string1}" = "${string2}" ]
}

heartpoints_pushImage() { local imageURI=$1; local herokuApiKey=$2
    docker login --username=tom@cleveweb.com --password="${herokuApiKey}" registry.heroku.com
    docker push "${imageURI}"
}

heartpoints_manualDeploy() { local gitSha=$1
    heroku_login
    heartpoints_deploy "${gitSha}" "$(heroku_authTokenForAlreadyLoggedInSession)"
}

heroku_authTokenForAlreadyLoggedInSession() {
    heroku auth:token
}

heartpoints_deploy() { local gitSha=$1; local herokuApiKey=$2
    local imageURI="registry.heroku.com/$(heroku_applicationName)/web:${gitSha}"
    local imageId=$(docker inspect ${imageURI} --format={{.Id}})
    curl -n -X PATCH https://api.heroku.com/apps/$(heroku_applicationName)/formation \
        -d '{"updates":[{"type":"web","docker_image":"'"${imageId}"'"}]}' \
        -H "Content-Type: application/json" \
        -H "Accept: application/vnd.heroku+json; version=3.docker-releases" \
        -H "Authorization: Bearer ${herokuApiKey}"
}

heroku_cli() { local args=$@
    if command_does_not_exist heroku; then
        (brew install heroku/brew/heroku)
    fi
    heroku $args
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