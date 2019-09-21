#!/usr/bin/env bash

source "src/cicd/string.sh"
source "src/cicd/process.sh"

allFunctionNames() {
    declare -F | awk '{print $NF}' | sort | uniq | grep -v "^_" 
}

function_exists() { local functionName=$1
    type -t $functionName > /dev/null 2>&1
}

functionNamesAndDescriptions() {
    declare -a functionNames=($(publicFunctionNames))
    for fullFunctionName in "${functionNames[@]}"
    do
        local possibleHelp=""
        local possibleHelpFunctionName="${fullFunctionName}_help"
        if function_exists "${possibleHelpFunctionName}"; then
            possibleHelp=" - $(${possibleHelpFunctionName})"
        fi
        local niceFunctionName="$(string_everythingAfterChar "${fullFunctionName}" "_")"
        echo "$(fixStringWidth "${niceFunctionName}" 30)$(fixStringWidth "${possibleHelp}" 80)"
    done
}

publicFunctionNames() {
    allFunctionNames | grep "hp_" | grep -v "_help"
}

command_does_not_exist() { local possibleCommand=$1
    ! command_exists "${possibleCommand}"
}

command_exists() { local possibleCommand=$1
    [ -x "$(command -v ${possibleCommand})" ]
}

requiredParameter() { local parameterName=$1; local parameterValue=$2
    errorIfEmpty "${parameterValue}" "${parameterName} is required parameter"
}