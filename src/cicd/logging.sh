#!/usr/bin/env bash

hp_log_path() { local remainingPath=$1
    local logFile="$(createAndReturnPath "$(devEnvironmentPath)/logs")/${remainingPath}"
    touch "${logFile}"
    echo "${logFile}"
}