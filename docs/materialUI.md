Material UI
===========

We are using [Material Design](https://en.wikipedia.org/wiki/Material_Design) from google as our design system, and the 
[@material-ui/core]((https://material-ui.com/getting-started/installation/)) NPM package which provides a 
[React](https://en.wikipedia.org/wiki/React_(JavaScript_library) implementation thereof.

# Themes

Themes define site-wide colors and other visual settings that are particular to the heartpoints brand. Themes can be updated [here](https://in-your-saas.github.io/material-ui-theme-editor/) or manually in code.


# Icons

Icons can be browsed visually [here](https://material.io/tools/icons/?style=baseline). When the icon of choice is found,
take note of the name, and then use the icon by importing the corresponding react component.

For example, if the icon is labeled `domain`, then:

```typescript
import DomainIcon from '@material-ui/icons/Domain';

const render = () => <DomainIcon />
```