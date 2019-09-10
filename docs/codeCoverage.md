Code Coverage
-------------

It is useful to know what code was exercised by tests, vs what code was not. This can be presented to us
as a percentage of overall code executed by a given test(s), and we can drill down into specific files and
folders to understand what was covered and what was not.

- We can measure and view code coverage locally during development, seeing code coverage inline in our IDE,
  which at this time is VS Code
- We can also measure and view code coverage in our CICD environment, seeing code coverage inline in github.com
  Pull Requests, where circleCI has measured the code during testing.

# Solution Components

We discuss possible solutions, which are combinations of tools and services together, shortly. First, the parts of
any solution shall be numbered:

1. Instrumentor - Code must be instrumented so that as code is executed, by tests or otherwise, it emits special 
   data about what line in the original source code is being executed. We call code with this capability 
   "instrumented" code. 
2. Monitor - A system which observes the emitted data from the instrumentor, putting together an increasingly
   detailed picture of what code was covered vs. what was not covered.
3. Report - The report containing the summary of what was covered vs. not, as well as the details, in human or
   machine readable form. Typically a json, xml or html file(s).
4. IDE Plugin - A plugin that can read (and continuously keep an eye on changes to) the coverage Report, updating
   the UI of the IDE to visually and easily show what code is tested vs. untested.
5. CICD Automation - A means to produce the report and send it to github for inline-viewing during code review
6. Github UI - A means to view code coverage inline on github.com during code review (may require browser plugin)

# Key Inputs

1. Tests currently run using ts-mocha, which helps automatically compile and run mocha
2. Instrumenting needs to occur somewhere between reading the raw ts / tsx source and running the tests
3. Sourcemaps may need to be produced, as well as used, to create a coverage report targetting original source
   (and not the compiled javascript that comes out of it and is in fact what gets tested / executed)

# Possible Solutions

Are there any solutions that show results in github.com without requiring a browser plugin? Haven't found any yet.

## Solution 1:

- [Instrumentor + Monitor](https://github.com/istanbuljs/nyc)
    - [Typescript Guidance](https://github.com/istanbuljs/nyc#typescript-projects)
    - [Default TS NYC Config](https://www.npmjs.com/package/@istanbuljs/nyc-config-typescript)
- [IDE Plugin](https://marketplace.visualstudio.com/items?itemName=brainfit.vscode-coverage-highlighter)
- [Github Integration](https://codecov.io/gh/heartpoints/heartpoints.org)

### Status of Solution 1:

- can run locally and produce a coverage report under coverage/coverage-final.json
- also was able to generate html report but was slow
- it appears that if this file is created during circleci build, that as long as the env id is set for codecov.io,
  it may automatically upload the report.

### How to Run:

From command line, run:

    hp cover

A coverage-final.json file will be written in the coverage folder. If on a mac, an html view will be produced in the coverage folder, and a browser window will open to show the report.

### View Coverage in VS Code

Additionally, the 
[Code Coverage Highlighter](https://marketplace.visualstudio.com/items?itemName=brainfit.vscode-coverage-highlighter)
plugin for Visual Studio Code can be used to view coverage results inline in source, where you can
quickly get it under test during [tdd](./tdd.md)

