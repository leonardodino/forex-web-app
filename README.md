# :currency_exchange: [forex web app](https://leonardodino.github.io/forex-web-app/) <small><small><sub><sup>&middot; &thinsp;frontend development assignment</sup></sub></small></small> [<img alt="iphone mockup" height="560" align="right" src="https://user-images.githubusercontent.com/8649362/53637603-5aa6e900-3c02-11e9-8ccf-10e445aa9a59.png"/>](https://leonardodino.github.io/forex-web-app/)

[![ci](https://github.com/leonardodino/forex-web-app/actions/workflows/ci.yml/badge.svg?event=push)](https://github.com/leonardodino/forex-web-app/actions/workflows/ci.yml?query=branch:master)
[![Build Status](https://api.travis-ci.com/leonardodino/forex-web-app.svg?branch=master)](https://www.travis-ci.com/github/leonardodino/forex-web-app)
[![Code Coverage](https://badgen.net/codecov/c/github/leonardodino/forex-web-app)](https://codecov.io/gh/leonardodino/forex-web-app)
[![License](https://badgen.net/github/license/leonardodino/forex-web-app)](https://github.com/leonardodino/forex-web-app/blob/master/LICENSE)
[![kunst.com.br](https://badgen.net/badge/@/kunst.com.br?color=black)](https://kunst.com.br)

> this project was a take-home exercise for a job interview (in [2019](https://github.com/leonardodino/forex-web-app/tree/HEAD@{2019-03-02}))

## :flight_departure: Quick Start

```bash
# Make a copy of this repo
$ git clone https://github.com/leonardodino/forex-web-app
$ cd forex-web-app

# Install project dependencies
$ yarn

# Start development server
$ yarn start # Opens browser at http://localhost:3000

# Start development test watcher
$ yarn test --coverage

# Production build
$ yarn build      # Outputs to ./build directory
$ npx serve build # Static server for the built website
```

## :sparkles: Features

<img src="https://user-images.githubusercontent.com/8649362/56626276-6bc71180-6617-11e9-9f0f-3a8b4ba6ea90.gif" align="left" height="220" width="220"/><img src="https://user-images.githubusercontent.com/8649362/56626450-163f3480-6618-11e9-87a6-b4cdcf99ad0e.gif" align="left" height="220" width="0"/>

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

<sup>> special thanks to [GitHub](https://github.com), [Netlify](https://netlify.com), [NPM](https://npmjs.com), [Travis CI](https://travis-ci.com), and [CodeCov](https://codecov.io) for supporting open-source projects with free tiers! </sup>

&copy; 2019 [Leonardo Dino](https://leonardodino.com)
