Code Coverage
-------------

It is useful to know what code was exercised by tests, vs what code was not. This can be presented to us
as a percentage of overall code executed by a given test(s), and we can drill down into specific files and
folders to understand what was covered and what was not.

- We can measure and view code coverage locally during development, seeing code coverage inline in our IDE,
  which at this time is VS Code
- We can also measure and view code coverage in our CICD environment, seeing code coverage inline (or linked to)
  within our github.com Pull Requests, where circleCI has measured the code during testing.

# Solution Components

Here's a quick overview of the main components of a Code Coverage solution:

1. Instrumentor - Code must be instrumented so that as code is executed, by tests or otherwise, it emits special 
   data about what line in the original source code is being executed. We call code with this capability 
   "instrumented" code. 
   See: [Instrumentor + Monitor](https://github.com/istanbuljs/nyc)
2. Monitor - A system which observes the emitted data from the instrumentor, putting together an increasingly
   detailed picture of what code was covered vs. what was not covered.
3. Report - The report containing the summary of what was covered vs. not, as well as the details, in human or
   machine readable form. Typically a json, xml or html file(s).
   See: [codecov.io](https://codecov.io/gh/heartpoints/heartpoints.org)
4. IDE Plugin - A plugin that can read (and continuously keep an eye on changes to) the coverage Report, updating
   the UI of the IDE to visually and easily show what code is tested vs. untested. 
   See: [IDE Plugin](https://marketplace.visualstudio.com/items?itemName=brainfit.vscode-coverage-highlighter)
5. CICD Automation - A means to produce the report and send it to github for inline-viewing during code review
   See: [hooks.sh](../src/hooks)
6. Github UI - A means to view code coverage inline on github.com during code review (requires browser extension)
   See: [sourcegraph browser extension](https://github.com/codecov/sourcegraph-codecov#usage)
7. SourceMapping - Source code, eg: Typescript, gets compiled by several tools to more primitive forms of javascript.
   If we instrument the lower level code, we then monitor that code. Somewhere between that point and viewing 
   reports, the toolchain may need to figure out how observations at one level of transpilation map to the
   original source code, in this case typescript, that developers care more about.
   The [.nycrc](../.nycrc) and [tsconfig.json](../tsconfig.json) configuration files enable source mapping for us.

# How to Run:

## Mac OSX

On your local development mac, run:

    hp cover

A coverage-final.json file as well as an html site will be written in the coverage folder, and a browser window will
open to show the report. 

If the [IDE Plugin](https://marketplace.visualstudio.com/items?itemName=brainfit.vscode-coverage-highlighter) is
active, then code coverage will show inline in VS Code.

## CICD Pipeline

[Pull requests](https://github.com/heartpoints/heartpoints.org/pull) are automatically tested by our
[circleci](https://circleci.com/gh/heartpoints/heartpoints.org/), which performs the steps defined in
the [circleci configuration file](../.circleci/config.yml).

These steps include running tests and obtaining a code coverage report. The report is sent to our
[codecov.io](https://codecov.io/gh/heartpoints/heartpoints.org) site where coverage details can be 
investigated. A link to the report is generated and appears within the comments / checks of the
pull request on github.

Coverage reports can be viewed embedded within the github.com review webpages, but only through the use
of the [sourcegraph browser extension](https://github.com/codecov/sourcegraph-codecov#usage). Without the
extension one need alternate between the coverage view of the code and a separate tab containing the
code review UI on github.com.

# See also

Checkout out [Test Driven Development - TDD](./tdd.md) for more information on development time test automation.