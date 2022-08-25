<div align="center">
  
  ![banner](docs/ts-js-k6.png)

# Template to use TypeScript with k6

![.github/workflows/push.yml](https://github.com/k6io/template-typescript/workflows/.github/workflows/push.yml/badge.svg?branch=master)

</div>

This repository provides tests for k6 scripts written in Typescript. It is
generated from the
[graphana/k6-template-typescript repo](https://github.com/grafana/k6-template-typescript).

## Rationale

While JavaScript is great for a myriad of reasons, one area where it fall short is type safety and developer ergonomics. It's perfectly possible to write JavaScript code that will look OK and behave OK until a certain condition forces the executor into a faulty branch.

While it, of course, still is possible to shoot yourself in the foot with TypeScript as well, it's significantly harder. Without adding much overhead, TypeScript will:

- Improve the ability to safely refactor your code.
- Improve readability and maintainability.
- Allow you to drop a lot of the defensive code previously needed to make sure consumers are calling functions properly.

## Prerequisites

- [k6](https://k6.io/docs/getting-started/installation)
- [NodeJS](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/getting-started/install) (optional)

## Installation

**Install dependencies**

Clone the generated repository on your local machine, move to the project root folder and install the dependencies defined in [`package.json`](./package.json)

```bash
$ yarn install
```

## Running the test

To run a test written in TypeScript, we first have to transpile the TypeScript code into JavaScript and bundle the project

```bash
$ yarn webpack
```

This command creates the final test files to the `./dist` folder.

Once that is done, we can run our script the same way we usually do, for instance:

```bash
$ k6 run dist/get-200-status-test.js
```

## Writing own tests

House rules for writing tests:

- The test code is located in `src` folder
- The entry points for the tests need to have "_test_" word in the name to distinguish them from auxiliary files. You can change the entry [here](./webpack.config.js#L8).
- If static files are required then add them to `./assets` folder. Its content gets copied to the destination folder (`dist`) along with compiled scripts.

### Transpiling and Bundling

By default, k6 can only run ES5.1 JavaScript code. To use TypeScript, we have to set up a bundler that converts TypeScript to JavaScript code.

This project uses `Babel` and `Webpack` to bundle the different files - using the configuration of the [`webpack.config.js`](./webpack.config.js) file.

If you want to learn more, check out [Bundling node modules in k6](https://k6.io/docs/using-k6/modules#bundling-node-modules).

#### Structure of dist folder

Structure of `dist` folder will mimic the structure of the `src` folder (of
course instead of "src" it will be at "dist", i.e. "src/foo/bar.ts" =>
"dist/foo/bar.js"). This way the `dist` js is separated by directory so we can
potentially run tests over everything in the "simulations" directory, for
example.

# How to run k6 load test for Event slayers

* Make a PR and add the new scripts to be run.
* Make a comment in an issue (If the scripts have been merged to main) or make a comment in the PR `start-test`.
* This should initialise the test and make the following resources.
  * k6 resource (`kubectl get k6 -n load-test`)
  * Configmaps (`kubectl get cm -n load-test`). PS: The configMaps would be named with the name of the test script.
  * k6 initialiser pods (`kubectl get pod -n load-test`)
  * The pods which will actually run the test. The number of pods will be equal to the parallelism number defined in the k6 resource.

