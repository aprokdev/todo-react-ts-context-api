![ts](https://badgen.net/badge/Built%20With/TypeScript/blue)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/Anton2501/todo/build)
[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)

Simple todo app based on React and TS

It is simple todo app, based on React and Typescript. Your todos will be saved in browser's LocalStorage. You can mark todos as complited, also edit them or delete. You can hide completed todos by clicking "Hide completed" checkbox, which appear as soon as you complete at least one todo.

How to start:

Install all dependencies by running `npm install` or `yarn install`
Srart development by `npm start` or `yarn start`
to make a build run `npm run build` or `yarn build`

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
