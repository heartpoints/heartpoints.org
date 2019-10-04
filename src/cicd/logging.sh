#!/usr/bin/env bash

hp_log_path() { local remainingPath=$1
    local logFile="$(createAndReturnPath "$(devEnvironmentPath)/logs")/${remainingPath}"
    touch "${logFile}"
    echo "${logFile}"
}

hp_runCommandWithLogCapture() { local logFileName="$1"; local command="${@:2}"
    $command > "$(hp_log_path ${logFileName})" 2>&1
}

warn() { local message="$@"
    echo ""
    echo "WARNING!!!"
    echo ""
    echo "$@"
    echo ""
}