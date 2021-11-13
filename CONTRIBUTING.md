# Contributing to My SSG

## Welcome

Thank you for being interested in contributing to this project!

## Contributing guidelines

1. Create new issue with a short description about what you are going to implement in the `Issues` tab
2. Fork the repository after I confirmed the issue and assigned it to you
3. Install `my-ssg` to your machine
4. Create new branch and start working on the issue.
5. Format, test and check your code before submitting a PR.

## Installation

1. Clone the forked repository
2. Install [NodeJs](https://nodejs.org/en/)
3. Redirect to the project directory
4. Run `npm install` to generate `node_modules` folder
5. Run `npm install -g .` to install **my-ssg** globally

## Use Prettier Formatter

Run `npm run prettier` to format all files with Prettier

Run `npm run prettier-check` to check whether all files are formatted with Prettier

## Use Eslint Linter

Run `npm run eslint` to find errors in all files with Eslint

Run `npm run eslint-fix` to fix fixable errors

## Use Jest Testing Framework

Run `npm test` to run all test cases

Run `npm test filename.test.js` to run test for a specific file

Run `npm test -- --watch` to start the test in watch mode
