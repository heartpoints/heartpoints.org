#!/usr/bin/env bash

hp_credentials_repo_clone_url() {
    echo "git@github.com:heartpoints/credentials.git"
}

remove_credentials_folder() {
    hp_runCommandWithLogCapture removeCredentialsFolder.log rm -rdf credentials
}

hp_credential() { local credentialName=$1
    remove_credentials_folder
    hp_runCommandWithLogCapture gitCloneCredentialsRepo.log hp_git clone "$(hp_credentials_repo_clone_url)"
    cat "credentials/${credentialName}"
    remove_credentials_folder
}