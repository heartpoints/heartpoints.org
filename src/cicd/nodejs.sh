#!/usr/bin/env bash

source "src/cicd/reflect.sh"
source "src/cicd/string.sh"
source "src/cicd/file.sh"

nodeVersion() {
    cat .nvmrc
}

nodeVersionNumber() {
    string_everythingAfterChar $(nodeVersion) "v"
}

nodejs_ensureCorrectVersion() {
    if command_does_not_exist "node" || ! strings_are_equal "$(node -v)" "$(nodeVersion)"; then
        nvm_installAndUseVersionInNvmRC
    fi
}

npm_cli() { local args=$@
    nodejs_ensureCorrectVersion   
    npm "$@"
}

hp_yarnInDocker() { local args="$@"
    #TODO: Ensure docker daemon is running? (or do that for any hp_docker call?)
    hp_nodeImageRun yarn "$@"
}

hp_nodeImageRun() { local commandAndArgs="$@"
    hp_docker run -it --rm "$PWD":/usr/src/app -w /usr/src/app node:$(nodeVersionNumber) "$@"
}

hp_node() { local args="$@"
    hp_nodeImageRun node "$@"
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