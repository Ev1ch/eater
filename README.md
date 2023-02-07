# Eater

## Stack

### Main

- TS
- Next
- MUI
- Firebase
- Redux

### Development

- Husky
- ESLint
- Prettier
- Lint-staged
- Commitlint

## Architecture

- public
- src
  - components - common atomic components which can be used in other modules
    - common
    - icons
    - layouts
  - core - basic types for pages, default pages constants
  - environment - folder with strict environment for both parts of application
    - client
    - server
  - locales - translation for localizations
  - modules
    - module
      - domain - core abstract entities for module, which are base for all data flow
      - abstracts - typing for module service logic
        - service
      - components
        - common
        - blocks
      - pages - pages, which are module specific and are built from blocks
      - slice
        - index - core slice reducer, thunks, actions
        - selectors
        - normalization - normalization interfaces and helper thunks
      - constants
  - pages
  - store - main reducer with custom wrappers for basic Redux utils
  - styles - core styles processing: default styles, themes, utils, caching

## Scripts

- dev
- start
- build
- lint
- eslint
- eslint:fix
- prettier
- prettier:fix
- prepare

## Routes

- / - home page
- /:id - meal page
