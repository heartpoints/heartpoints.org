#!/usr/bin/env bash

errorAndExit() { local message=$@
    echo $message
    exit 1
}