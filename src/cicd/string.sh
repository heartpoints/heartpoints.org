#!/usr/bin/env bash

source "src/cicd/process.sh"

string_is_empty() { local possiblyEmptyString=$1
    [[ -z "${possiblyEmptyString}" ]]
}

stringLength() { local stringInQuestion=$1
    echo ${#stringInQuestion}
}

fixStringWidth() { local originalString=$1; local fixedWidth=$2
    local limitedString="$(string_firstNChars "${originalString}" $fixedWidth)"
    local limitedStringLength="$(stringLength "${limitedString}")"
    local spacesNeeded=$(expr $fixedWidth - $limitedStringLength)
    local spaces="$(padString " " $spacesNeeded)"
    echo "${limitedString}${spaces}"
}

padString() { local stringToPad=$1; local numTimes=$2
    local printFCommand="printf '${stringToPad}%.0s' {0..${numTimes}}"
    eval $printFCommand
}

string_toLower() { local stringToConvertToAllLowercase=$1
    echo "$stringToConvertToAllLowercase" | tr '[:upper:]' '[:lower:]'
}

string_firstNChars() { local sourceString=$1; local n=$2
    echo "${sourceString}" | cut -c 1-$n
}

string_everythingAfterChar() { local sourceString=$1; local delimitingCharacter=$2;
    echo "${sourceString}" | cut -d "${delimitingCharacter}" -f 2- -
}

string_everythingBeforeChar() { local sourceString=$1; local delimitingCharacter=$2;
    cut -d "${delimitingCharacter}" -f 1 <<< "$sourceString"
}

trimAllWhitespace() { local stringToTrim=$1
    echo "${stringToTrim}" | tr -d '[:space:]'
}

trimLeadingWhitespace() { local stringToTrim=$1
    echo "${stringToTrim}" | sed -e 's/^[[:space:]]*//'
}

everythingAfterLastSlash() { local stringWithSlashes=$1
    echo ${stringWithSlashes##*/}
}

errorIfEmpty() { local possiblyEmpty=$1; local errorMessage=$2
    if string_is_empty "${possiblyEmpty}"; then
        errorAndExit "${errorMessage}"
    fi
}

stringReplace() { local originalString=$1; local stringToReplace=$2; local stringToPutInItsPlace=$3
    echo "$originalString" | sed "s~${stringToReplace}~${stringToPutInItsPlace}~"
}

strings_are_equal() { local string1=$1; local string2=$2
    [ "${string1}" = "${string2}" ]
}

strings_are_not_equal() { local string1=$1; local string2=$2
    ! strings_are_equal "${string1}" "${string2}"
}

stringContains() { local soughtSubstring=$1; local fullString=$2
    [[ $fullString == *"${soughtSubstring}"* ]]
}