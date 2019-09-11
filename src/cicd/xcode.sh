#!/usr/bin/env bash

hp_xcode_install() {
    local commandLineToolsPath="/Library/Developer/CommandLineTools"
    mkdir -p "${commandLineToolsPath}"
    sudo rm -rf "${commandLineToolsPath}"
    xcode-select --install
    sudo xcode-select -s /Applications/Xcode.app/
    softwareupdate --install Xcode
}