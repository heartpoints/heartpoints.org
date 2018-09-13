#!/usr/bin/env bash
heartpoints() { local command=$1
    if string_is_empty "${command}"; then
        heartpoints_help
    else
        heartpoints_${command}
    fi
}

heartpoints_help() {
    echo ""
    echo "Usage: heartpoints.sh [command]"
    echo ""
    echo "Commands:"
    echo ""
    echo "dev"
    echo "deploy"
    echo ""
}

string_is_empty() { local possiblyEmptyString=$1
    [[ -z "${possiblyEmptyString}" ]]
}

heartpoints_dev() {
    nvm_load
    nvm install
    nvm use
    if command_does_not_exist "yarn"; then
        npm install yarn -g
    fi
    yarn
    open http://localhost:5001
    yarn start
}

heartpoints_deploy() {
    if git_working_directory_is_clean; then
        (brew install heroku/brew/heroku)
        heroku login
        heroku git:remote --app heartpoints-org
        git push heroku master
    else
        echo "Cannot deploy, working directory not clean"
        exit 1
    fi
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
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
}

nvm_load() {
    if command_does_not_exist "nvm"; then
        if file_does_not_exist "$(nvm_script_path)"; then
            nvm_download_and_install
        fi
        nvm_load_existing_nvm
    fi
}

heartpoints $@