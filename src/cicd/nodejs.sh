#!/usr/bin/env bash

source "src/cicd/reflect.sh"
source "src/cicd/string.sh"
source "src/cicd/file.sh"

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