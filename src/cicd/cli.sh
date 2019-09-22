#!/usr/bin/env bash

source "src/cicd/string.sh"
source "src/cicd/reflect.sh"
source "src/cicd/process.sh"

heartpoints() { local command=${1-""}; local remainingArgs="${@:2}"
    if string_is_empty "${command}"; then
        hp_help
    else
        local localFunctionName="hp_${command}"
        if function_exists "${localFunctionName}"; then
            $localFunctionName "${@:2}"
        else
            if function_exists $command; then
                $command "${@:2}"
            else
                hp_help
                errorAndExit "Command not found"
            fi
        fi
    fi
}

hp_help() {
    echo ""
    echo "Usage: heartpoints.sh [command]"
    echo ""
    echo "Commands:"
    echo ""
    functionNamesAndDescriptions
}