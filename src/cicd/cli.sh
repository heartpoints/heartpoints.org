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
                hp_help "${command}"
                echo ""
                errorAndExit "Error: Command '${command}' not found"
                echo ""
            fi
        fi
    fi
}

hp_help() { local possibleCommand="${1:-}"
    echo ""
    echo "Usage: hp [command]"
    echo ""
    echo "Commands:"
    echo ""
    if string_is_empty "${possibleCommand}"; then
        functionNamesAndDescriptions
    else
        functionNamesAndDescriptions | grep "${possibleCommand}"
    fi
}