# Eater

## Stack

### Main

- Node.js v16
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

### Working flow
The client makes a request to the server by executing a function from services. They simulate the work of a full-fledged backend, and are used to obtain data from the database and bring them to the correct appearance according to the created interfaces. Next, the client uses this data to display changes on the page, normalizes them (for example, leaves only its unique identifier from the Category entity) and adds this data to Redux, from where it will be operated on in the future.
The database was decided to use Firestore from Firebase, because it does not need to be hosted separately and development with it is very easy. The database contains all the main entities and their attributes
We also used Google Provider authorization from Firebase, because it is also incredibly easy.
To host the application, we used the Vercel service, because it is free for us + it is developed by the same team as the Next.JS framework, which makes them perfectly compatible

## To run the app
1. `git clone git@github.com:Ev1ch/eater.git`
2. `yarn install --frozen-lockfile` (need to install yarn if you don't have it)
3. `yarn start`
4. Go to `http://localhost:3000`

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
  - pages - Next JS page router
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
