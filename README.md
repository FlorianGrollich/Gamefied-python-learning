# Python Playground

## Table of Contents

1. [Description](#description)
2. [Setup](#setup)
   - [Clone the Project](#clone-the-project)
   - [Install dependencies](#install-dependencies)
3. [Run the Project](#run-the-project)
   - [Run both backend and frontend](#run-both-backend-and-frontend)
   - [Run only the backend](#run-only-the-backend)
   - [Run only the frontend](#run-only-the-frontend)
4. [Code Quality and Dependencies Check](#code-quality-and-dependencies-check)
   - [Code Quality and Styling (ESLint + Prettier)](#code-quality-and-styling-eslint--prettier)
   - [Dependencies Check](#dependencies-check)
   - [Dependencies Fix](#dependencies-fix)
5. [Run Tests](#run-tests)
   - [Run All Tests](#run-all-tests)
6. [Review Dependabot Dependency Updates](#review-dependabot-dependency-updates)

## Description

A Project which enables users, especially kids, to learn the basics of programming in a more playful way.


## Setup

### Clone the Project

```bash
git clone https://github.com/FlorianGrollich/Banana.git
```

### Install dependencies
``` bash
npm install
````

## Run the Project

### Run both backend and frontend

```bash
npm start
```

### Run only the backend

```bash
npm run server
```

### Run only the frontend

```bash
npm run frontend
````

## Code Quality and Dependencies Check

To check the code for syntax and dependencies issues, run the following commands before committing:

### Code Quality and Styling (ESLint + Prettier)
```bash
npm run lint-format-all
```

### Dependencies Check
```bash
npm run check
```

### Dependencies Fix
- If dependency vulnerabilities are found, the following command can be used. Please ensure that the application will not break due to the fixes.
```bash
npm audit fix
```

## Run Tests

### Run All Tests
To run all tests across the unit, integration, and API layers enter:
```bash
npm run test
```

## Review Dependabot Dependency Updates

The following steps need to be followed if Dependabot opens a pull request.

**1) **Checkout the branch created by Dependabot:****
  ```bash
  git checkout dependabot/npm_and_yarn/your-dependency-version
  ```

**2) Run tests locally** to ensure that the update does not introduce issues:
  ```bash
  npm run check
  ```

**3) Test the application manually if needed.**

**4) Go through changelog of updated dependency and check for breaking changes.**

**5) Merge the PR.**
