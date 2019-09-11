#!/usr/bin/env bash

source "src/cicd/string.sh"

hp_isMac() {
    strings_are_equal "$(uname)" "Darwin" > /dev/null
}