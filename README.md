# :currency_exchange: [forex web app](https://forex.leonardodino.com) <img alt="iphone mockup" height="560" align="right" src="https://user-images.githubusercontent.com/8649362/53637603-5aa6e900-3c02-11e9-8ccf-10e445aa9a59.png"/>

[![Netlify Status](https://api.netlify.com/api/v1/badges/a7700bf8-8021-4750-a84c-625fd9826cb4/deploy-status)](https://app.netlify.com/sites/forex-web-app/deploys)
[![Build Status](https://travis-ci.com/leonardodino/forex-web-app.svg?branch=master)](https://travis-ci.com/leonardodino/forex-web-app)
[![Code Coverage](https://badgen.net/codecov/c/github/leonardodino/forex-web-app)](https://codecov.io/gh/leonardodino/forex-web-app)
[![License](https://badgen.net/github/license/leonardodino/forex-web-app)](https://github.com/leonardodino/forex-web-app/blob/master/LICENSE)

**Frontend Development Home Task**: single screen forex web app

<sup>:briefcase: The original work was done part-time, between [`22/01/2019`](https://github.com/leonardodino/forex-web-app/commit/5053772e82cb21c1d86a0fdb11b6d7db0465ee23) and [`01/02/2019`](https://github.com/leonardodino/forex-web-app/commit/bba2dda4ec6c52e7df381fee62b80476f318eab4).</sup>

<sup>:nerd_face: More recently, the code was refactored into [`typescript`](https://github.com/leonardodino/forex-web-app/pull/2), as an exercise.</sup>

## :flight_departure: Quick Start

> Make sure you have all [the system dependencies](#system-dependencies) before proceeding.

```bash
# Make a copy of this project
$ git clone https://github.com/leonardodino/forex-web-app
$ cd forex-web-app

# Install project dependencies
$ yarn

# Development server
$ yarn start # Opens browser at http://localhost:3000

# Development test watcher
$ yarn test --coverage

# Production build
$ yarn build      # Outputs to ./build directory
$ npx serve build # Static server for the built website
```

For details more about these scripts, refer to the [Create React App docs](https://facebook.github.io/create-react-app/docs/getting-started).

## :sparkles: Features

- [x] :alembic: react hooks + context
- [x] :art: 8pt grid + simple design
- [x] :musical_keyboard: keyboard accessible
- [x] :shower: no media queries
- [x] :100: interactive <sub><sup>(rates updates don't mess with user input)</sup></sub>
- [x] :electric_plug: service worker + offline state
- [x] :robot: decently tested
- [x] :hammer_and_wrench: `typescript`

## :nut_and_bolt: Dependencies / Services / Assets

| name                                                              | license                                                                                                                                                        | description                                           |
| ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| [`react`](https://reactjs.org/)                                   | [![License](https://badgen.net/github/license/facebook/react/)](https://api.github.com/repos/facebook/react/license)                                           | declarative, component-based, library for building ui |
| [`react-router`](https://github.com/ReactTraining/react-router)   | [![License](https://badgen.net/github/license/ReactTraining/react-router/)](https://api.github.com/repos/ReactTraining/react-router/license)                   | declarative routing for react                         |
| [`create-react-app`](https://facebook.github.io/create-react-app) | [![License](https://badgen.net/github/license/facebook/create-react-app/)](https://api.github.com/repos/facebook/create-react-app/license)                     | create react apps with no build configuration         |
| [`styled-components`](https://styled-components.com/)             | [![License](https://badgen.net/github/license/styled-components/styled-components/)](https://api.github.com/repos/styled-components/styled-components/license) | `css-in-js`: visual primitives for the component age  |
| [`dinero.js`](https://sarahdayan.github.io/dinero.js)             | [![License](https://badgen.net/github/license/sarahdayan/dinero.js/)](https://api.github.com/repos/sarahdayan/dinero.js/license)                               | immutable utils to create, calculate and format money |
| [`use-interval`](https://github.com/Hermanya/use-interval)        | [![License](https://badgen.net/github/license/Hermanya/use-interval/)](https://api.github.com/repos/Hermanya/use-interval/license)                             | react hook for setting an interval                    |
| [`react-testing-library`](https://testing-library.com/react)      | [![License](https://badgen.net/github/license/kentcdodds/react-testing-library/)](https://api.github.com/repos/kentcdodds/react-testing-library/license)       | utilities that encourage good testing practices       |
| [`jest`](https://jestjs.io/)                                      | [![License](https://badgen.net/badge/license/MIT/blue)](https://api.github.com/repos/facebook/jest/license)                                                    | delightful javascript testing                         |
| [`gitmoji`](https://www.typescriptlang.org/)                      | [![License](https://badgen.net/github/license/carloscuesta/gitmoji/)](https://api.github.com/repos/carloscuesta/gitmoji/license)                               | emoji reference for commit messages                   |
| [`typescript`](https://www.typescriptlang.org/)                   | [![License](https://badgen.net/github/license/Microsoft/TypeScript/)](https://api.github.com/repos/Microsoft/TypeScript/license)                               | superset of javascript, with types                    |
| [Inter](https://rsms.me/inter/)                                   | [![License](https://badgen.net/github/license/rsms/inter/)](https://api.github.com/repos/rsms/inter/license)                                                   | typeface designed for computer screens                |
| [Crypto Compare API](https://min-api.cryptocompare.com/)          | [![License](https://badgen.net/badge/license/CC%20BY-NC/blue)](https://min-api.cryptocompare.com/faq)                                                          | free forex api, updates every 10 seconds              |
| [iPhone Mockup](http://www.designbolts.com/download/56032/)       | [![License](https://badgen.net/badge/license/link%20back/purple)](http://www.designbolts.com/2017/09/14/free-vector-apple-iphone-8-mockup-ai-eps/)             | free vector apple iphone 8 mockup ai & eps            |

<sup>> special thanks to [GitHub](https://github.com), [Netlify](https://netlify.com), [NPM](https://npmjs.com), [Travis CI](https://travis-ci.com), and [CodeCov](https://codecov.io) for supporting open-source projects with free tiers (: </sup>

### System Dependencies

| name     | minimum version |
| :------- | --------------: |
| **git**  |         `2.0.0` |
| **node** |         `8.0.0` |
| **yarn** |         `1.0.0` |

## :page_facing_up: License

[MIT](LICENSE)
