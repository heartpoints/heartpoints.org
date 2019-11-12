heartpoints.org website
==================================

Welcome to the Heartpoints.org website repository!

# Table of Contents

- [Initial Development Environment Setup](docs/initialDeveloperSetup.md)
- [Using Github](docs/usingGithub.md) - Issues, Pull Requests, and Source Control
- [Heartpoints CLI](docs/cli.md) - Overview for the `./hp` command line interface for running dev tasks (ie: 
  compiling/testing)
- [Typescript](docs/typescript.md) - Our main language of choice for both front and back end
- [Running Local heartpoints.org REST API](docs/serverDev.md) - Run Local Version of the API server
- [Running Local heartpoints.org Website](docs/clientDev.md) - Run Local Version of heartpoints.org
- [Code Coverage](docs/codeCoverage.md) - Measuring Code Coverage during Tests and Viewing Coverage (locally and on
  github.com PRs)
- [Production Website](docs/production.md) - Find, view, administrate the live version of http://www.heartpoints.org
- [Heartpoints Domain](docs/domain.md) - Domain registrar and DNS management info for the heartpoints.org domain
- [TLS / Security Certificates / HTTPS](docs/tls.md) - How the site runs on HTTPS vs HTTP
- [Material UI](docs/materialUI.md) - Our Design system - for look and feel and design
- [Figma](https://www.figma.com/files/team/763533984756947560/Heartpoints) - Our design collaboration space
- [SOLID Principles](docs/solidPrinciplesInPractice.md) - guidance on software design
- [Common Errors](docs/commonErrors.md) - a list of commonly found errors and advice to troubleshoot / fix them
- [Testing](docs/tdd.md) - Test Driven Development
- [CSS Tricks](https://css-tricks.com) - Help with tricky CSS spacing / alignment / responsive
- Links to Other Resources
    - [Heartpoints Google Drive](https://docs.google.com/document/d/1BZXYQGlBMvy1x8UQ5b8Bco7hyasknCCjdy6DxbKI03Q) 
      contains shared company documents, spreadsheets, presentations that are not in github
    - [Credentials](https://github.com/heartpoints/credentials) Limited Access repository containing org credentials / private keys
    
# Mobile Styling Concerns

## HPSearchBar

Autosuggest component wider than viewport on most mobile devices

Suggestion container should be a scrollbar

## CreateOrganization + EditLoadedOrganization

Text inputs wider than viewport on most mobile devices

## SideNav

Should encompass entire screen on mobile

## LoadedOrganization + LoadVolunteeringOption

Page titles wrap with longer names (text is too big)

This causes the EditButton and DeleteButton for that opp/org to be displayed poorly

## HomePage

"help us build something amazing" text too large, and wraps to 3 lines, on most mobile devices

## /volunteering/SearchBar + /organizations/SearchBar

Page titles wrap with longer names (text is too big)
