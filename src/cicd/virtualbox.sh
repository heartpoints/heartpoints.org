#!/usr/bin/env bash

source "src/cicd/brew.sh"

virtualbox_install_globally() {
    hp_brew_cask_install virtualbox --force --verbose --debug
}