# Initial Developer Setup

## Prerequisites

Have Docker installed.

## Clone the repository to your development environment

Follow [these instructions](https://help.github.com/articles/cloning-a-repository/) to get a local version of this
repository.

## Set up Dev Environment

Most commands run from the [hp CLI](cli.md) (ie: `./hp [command]`), will automatically download dependencies lazily,
on an as-needed basis, installing everything into a local, .gitignored `devEnvironment` folder within the repo 
directory.

You may optionally, proactively install these items up front by running:

`./hp devEnviromentSetup`

## Globally Installed Dev Dependencies

While our automation attempts to isolate all software installed for development purposes to the `devEnvironment` 
folder, there are a few dependencies which are installed globally:

- virtualbox
- yarn
- nvm

Please be aware that scripts may attempt to install these applications in non-isolated places.