![ts](https://badgen.net/badge/Built%20With/TypeScript/blue)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/Anton2501/todo/build)
![jest](https://jestjs.io/img/jest-badge.svg)

Simple todo app based on React and TS

It is simple todo app, based on React, Typescript and React context. Your todos will be saved in browser's LocalStorage. You can mark todos as complited, also edit them or delete. You can hide completed todos by clicking "Hide completed" checkbox. You can also clean todos, saved in browasers's storage by clicking "Clear Local Storage" button. After that you can update page and see it clean. Please notice, that every action with todos will save them to the browsers storage.

How to start:

Install all dependencies by running `npm install` or `yarn install`.

Start development with `npm start` or `yarn start` commands.

To make a production build run `npm run build` or `yarn build`

To run unit tests, run `npm run tests` for verbose results or `npm run test:dev` for development mode.

To run E2E tests, run `npm run tests:e2e`

To ensure, that sorting works, you can put the following code to console and press Enter, then update page and change sorting by clicking on "Sort tasks by:"

```
    localStorage.setItem('listTodos', JSON.stringify([
        { id: '1660138005899', created: 1660138005899, isCompleted: true, label: 'asds dsaddbsaddft' },
        { id: '1660138010767', created: 1660138010767, isCompleted: true, label: 'pouipiuoiuou' },
        { id: '1660138025187', created: 1660138025187, isCompleted: false, label: 'werewrewr' },
        { id: '1660138034979', created: 1660138034979, isCompleted: true, label: 'dfgfdamfdfd' },
        { id: '1660138040124', created: 1660138040124, isCompleted: true, label: 'iidfigdfigdf' },
        { id: '1660138042611', created: 1660138042611, isCompleted: false, label: 'bfsdfdsfds' },
        { id: '1660140356843', created: 1660140356843, isCompleted: false, label: '12213fdgd' },
        { id: '1660307378285', created: 1660307378285, isCompleted: false, label: 'test text' },
    ]));
```
