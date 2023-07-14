# Using NPM

NPM stands for node pacakge manager and it comes preinstalled with node. It is a CLI app that we use to install and manage open source packages.

To start using npm in our project we need to run

```bash
npm init
```

This will create a package.json file (package.json) which contains the configuration for our project.

## Types of packages we can install with NPM

There are two types of packages we can install with NPM. Those are **simple dependencies and development dependencies**. Simple or regular dependencies are simply packages which we include in our project, these contain the code upon which we build our project.

To install a regular package run
`npm install package_name (npm install package_name --save in older version of npm)`

After installing this package it is added as dependencies in the package.json file.

Besides regular dependencies we have development dependencies which are tools that we use during the development of project like - code bundlers or testing library. They are not needed of production. To install them we use -

```bash

npm install package_name --save-dev
```

After installing a new field called dev-dependencies will be created in the pacakge.json file and this pacakge will be added to the list.

## Installing packages globally

```bash
npm install package_name --global
```

You need to become sudo to be able to install packages globally on linux or mac.

## nodemon

nodemon is a package that allows us watch changes in scripts and automatically restart the application if they change, to use nodemon we give the script name as argument like so -

```bash
nodemon index.js

```

## running locally installed packages

to run locally installed package we need to create a command in scripts field on package.json file.

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon index.js"
  },

```

Then simply run `npm run start` or `npm start` because "start" is a special type of command.

## updating packages

In package.json our packages are listed in this format.
"live-server": "^1.1.0"

(^) means that we accept update for minor version and patch version.
(-) means that we accept update for any version (major version included).
(~)means that we just accept update for patch version.

To check which packages are outdated run `npm outdated'. This give a list of outdated packages.

To update a package we run `npm update package_name`

To remove a package run `npm uninstall package_name`
