#!/usr/bin/env bash

hp_yarn() { local args="$@"
    hp_yarn_global "$@"
}

hp_yarn_help() { echo "globally install (if needed) - and then call - yarn dependency manager for nodejs"; }
hp_yarn_global() { local args=$@
    if command_does_not_exist "yarn"; then
        npm_cli install yarn -g
    fi
    yarn "$@"
}