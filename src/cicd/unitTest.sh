#!/usr/bin/env bash

source "src/cicd/yarn.sh"
source "src/cicd/mac.sh"
source "src/cicd/k8s.sh"

hp_unitTest_help() { echo "run the mocha unit tests, which test without build / deploy"; }
hp_unitTest() { local args="$@"
    hp_yarn_global ts-mocha "src/**/*.test.ts" "$@"
}

hp_unitTestWatch_help() { echo "run unit tests continuously, updating every time files are saved"; }
hp_unitTestWatch() { local args="$@"
    hp_unitTest --watch --watch-extensions ts "$@"
}

hp_cover_help() { echo "run unit tests over instrumented code, producing coverage reports"; }
hp_cover() {
    if hp_isMac; then
        hp_yarn_global coverHTML
        echo "On Mac, so not reporting coverage to coverage.io; will open local browser instead..."
        open "./coverage/index.html"
    else
        hp_yarn_global cover
        echo "Not on Mac, assuming CICD environment, writing coverage to codecov.io"
        bash <(curl -s https://codecov.io/bash) -t ${CODECOV_TOKEN}
    fi
}

hp_onTestComplete() { local failureOrSuccess=$1
    echo """

    Test Suite ${failureOrSuccess}

    """
}

hp_test() { local baseUrl=$1
    echo "Testing..."
    echo "Test homepage html file is 200..."
    echo "$(curl -L --insecure "${baseUrl}" --fail -o /dev/null)"
    echo "passed"
    echo "" 
    echo "Test bundle.js file is 200..." 
    echo "$(curl -L --insecure "${baseUrl}/bundle.js" --fail -o /dev/null)"
    echo "passed"
    echo "" 
    echo "Test commitSha presence in header matches current sha ($(git_currentSha)):"
    local headerOutput="$(curl -L --insecure -I "${baseUrl}?preventCache=$(date +%s)")"
    echo "$headerOutput"
    if echo "$headerOutput" | grep -i "commitSha: $(git_currentSha)"; then
        hp_onTestComplete "passed"
    else
        hp_onTestComplete "failed"
        return 1
    fi
}

hp_minikubeRunTests_help() { echo "run tests against an existing minikube-hosted website"; }
hp_minikubeRunTests() {
    hp_test "$(hp_urlOfMinikubeWebsite)"
}

hp_testUntilSuccess() { local timeoutSeconds=$1; local interval=$2; local testCommand=${@:3}
    timer=0
    while true; do
        if "${@:3}"; then
            break
        elif [ $timer -ge $timeoutSeconds ]; then
            echo "Maximum retries exceeded. Test failed"
            exit 1
        fi
        echo "Test failed. A total of $timer seconds have elapsed. Attempting again after $interval seconds..."
        timer=$(($timer+$interval))
        sleep $interval
    done
}