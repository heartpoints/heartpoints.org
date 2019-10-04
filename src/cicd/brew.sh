#!/usr/bin/env bash

source "src/cicd/reflect.sh"
source "src/cicd/logging.sh"

hp_brew_clean_help() { echo "cleans brew in case of unexpected install errors"; }
hp_brew_clean() {
    hp_brew update-reset && hp_brew update
    hp_brew doctor
}

brew_install() { local packageName=$1
    if command_does_not_exist "${packageName}"; then
        hp_brew install "$packageName"
    fi
}

brew_package_run() { local packageName=$1; local args="${@:2}"
    local brewPackagePath="$(brew_package_path ${packageName})"
    if command_does_not_exist "${brewPackagePath}"; then
        hp_runCommandWithLogCapture "brewPackageInstall_${packageName}.log" hp_brew install "${packageName}"
    fi
    "${brewPackagePath}" "${@:2}"
}

brew_package_path() { local packageName=$1;
    echo "$(hp_brew --prefix "${packageName}")/bin/${packageName}"
}

brew_cask_cellar_path() {
    createAndReturnPath "$(homebrew_install_dir)/Cellar"
}

hp_brew_cask_install() { local caskName=$1; local options="${@:2}"
    if hp_brew_cask_notInstalled "${caskName}"; then
        runCommandSilently brew_cask_cellar_path
        hp_runCommandWithLogCapture "caskInstall_${caskName}.log" hp_brew cask install ${caskName} "${@:2}"
    fi
}

hp_brew_cask_run() { local caskName=$1; local args="${@:2}"
    hp_brew_cask_install "${caskName}"
    "$(homebrew_bin_path "${caskName}")" "${@:2}"
}

hp_brew_cask_notInstalled() { local caskName=$1
    combineOutputStreams hp_brew cask info "${caskName}" | runCommandSilently grep "Not installed"
}

brew_app_dir_path() {
    createAndReturnPath "$(devEnvironmentPath)/brewAppDir"
}

hp_brew() { local args="$@"
    if command_does_not_exist "$(homebrew_cli_path)"; then
        brew_install_brew_itself
    fi
    $(homebrew_cli_path) "$@"
}

homebrew_cli_path() {
    homebrew_bin_path brew
}

homebrew_bin_path() { local caskOrPackageName=$1
    echo "$(homebrew_install_dir)/bin/${caskOrPackageName}"
}

homebrew_install_dir() {
    createAndReturnPath "$(devEnvironmentPath)/homebrew"
}

homebrew_tar_path() {
    createAndReturnPath "$(devEnvironmentPath)/homebrewTar"
}

brew_install_brew_itself() {
    local tarFilePath="$(homebrew_tar_path)/hombrew.zip"
    hp_runCommandWithLogCapture \
        "homebrew_tar_download.log" \
        curl -L https://github.com/Homebrew/brew/tarball/master --output "${tarFilePath}"

    cat "${tarFilePath}" \
        | combineOutputStreams tar xz --strip 1 -C "$(homebrew_install_dir)" \
        | tee "$(hp_log_path homebrew_unzip.log)"
}