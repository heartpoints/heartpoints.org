#!/usr/bin/env bash

errorAndExit() { local message="$@"
    printf "${message}"
    exit 1
}