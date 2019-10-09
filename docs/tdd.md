Test Driven Development
-----------------------

We use Test Driven Development (TDD) to get our work under automated test. Please read up on the following materials
to undewrstand more about TDD in practice:

    - [Test Driven Development](https://en.wikipedia.org/wiki/Test-driven_development)
    - [Red, Green, Refactor](https://www.codecademy.com/articles/tdd-red-green-refactor)

# How to Run Tests

The `./hp` CLI can be called to discover available commands; some of those include commands for testing. Ideally, we
all write and maintain tests locally as we develop features or bug fixes. During the [CICD](./usingGithub.md) pipeline
execution, your changes will be noticed and automatically your updated tests will be run.

To run unit tests:

    hp unitTest

To run unit tests in continuous watch mode (auto reruns upon change):

    hp unitTestWatch

# Code Coverage

Read up on how [code coverage](./codeCoverage.md) helps us understand what code is tested vs. not tested.

# Other types of Tests

NOTE: This section is incomplete.

Besides the unit tests, there are tests that require the web server to run. The test then hits some known endpoints to
validate the expected response. This includes a test that the latest commit sha is served up in the response so that
callers can confirm the version of the webserver that is running.

The web server can run on mac directly as a nodejs process, or within a docker container, either managed directly by
the docker CLI and daemon, or by minikube, the dev version of a kubernetes cluster.

As of the time of this writing, there are several paths to build, deploy and test this layer, expressed within the
[hp](../hp) file. Ideally, these utilities can be tested out of band in separate jobs to validate that they
continue to work, perhaps on a virtual mac that is able to successfully host docker and kubernetes.