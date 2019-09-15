#!/usr/bin/env bash

source "src/cicd/brew.sh"

hp_slack() {
    set -e
    hp_brew_cask_install "slack"
    echo "Slack is installed / installing. Please use CTRL+space on Mac and search for 'slack' to use it"
    echo "NOTE: Slack may take a moment before it is available, if it was not previously installed."
    echo ""
}