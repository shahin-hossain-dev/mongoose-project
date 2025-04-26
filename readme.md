# Express Server with Typescript

## Project Initialization Doc

- create a project package `npm init`
- install express js -> `npm install express`
- install typescript as dev dependency `npm install -D typescript`

- add tsconfig.json typescript compiler `tsc --init`
- tsconfig.json এর মধ্যে typescript config set করতে হবে।
- typescript এর file গুলো রাখার জন্য src file
  config এর মধ্যে `"rootDir": "./src/"` set করতে হবে।

- typescript থেকে convert হয়ে javaScript file গুলো dist file রাখার জন্য
  config এর মধ্যে `"outDir": "./dist/"` set করে দিতে হবে।
- typescript require syntax support করে না তাই এর জন্য @types/node package install করতে হবে।
  `npm i --save-dev @types/node`
- typescript কে express এর type বুঝানোর জন্য @types/express package install করতে হবে।
  `npm i --save-dev @types/express`

- [eslint and Prettier setup](https://blog.logrocket.com/linting-typescript-eslint-prettier/)

---
