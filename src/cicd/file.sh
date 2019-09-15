#!/usr/bin/env bash

file_does_not_exist() { local possibleFilePath=$1
    ! [ -e "${possibleFilePath}" ]
}

fileReplace() { local fileName=$1; local stringToReplace=$2; local stringToPutInItsPlace=$3
    cat "${fileName}" | sed "s~${stringToReplace}~${stringToPutInItsPlace}~"
}

createAndReturnPath() { local path=$1
    mkdir -p "${path}"
    echo "${path}"
}