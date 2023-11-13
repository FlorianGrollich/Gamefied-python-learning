# Python Playground: Gamified Education Platform to Learn Python

## Table of Contents

1. [Description](#description)
2. [Prerequisites](#prerequisites)
3. [Setup](#setup)
   - [Clone the Project](#clone-the-project)
   - [Install Dependencies](#install-dependencies)
   - [Set Up .env Files](#set-up-env-files)
4. [Run the Project](#run-the-project)
   - [Run the DB](#run-the-db)
   - [Run Both Backend and Frontend](#run-both-backend-and-frontend)
   - [Run Only the Backend](#run-only-the-backend)
   - [Run Only the Frontend](#run-only-the-frontend)
5. [Code Quality and Dependencies Check](#code-quality-and-dependencies-check)
   - [Code Quality and Styling (ESLint + Prettier)](#code-quality-and-styling-eslint--prettier)
   - [Dependencies Check](#dependencies-check)
   - [Dependencies Fix](#dependencies-fix)
6. [Run Tests](#run-tests)
   - [Run All Jest Tests](#run-all-jest-tests)
   - [Run Frontend Cypress Tests](#run-frontend-cypress-tests)
7. [Review Dependabot Dependency Updates](#review-dependabot-dependency-updates)

## Description

Python Playground is an interactive platform designed to introduce children to the fundamentals of programming through engaging and playful activities. It offers a variety of challenges that teach core concepts in a kid-friendly environment.

## Prerequisites

Before you begin, ensure you have the following installed:

- NVM and Node.js (v20.8.1 or above)
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
   nvm install 20.8.1
   nvm use 20.8.1
   ```

- TypeORM (0.3.17 or above)
  ```bash
   npm install -g typeorm@0.3.17
   ```
  
- Download the [Docker Daemon](https://docs.docker.com/get-docker/)

## Setup

### Clone the Project
```bash
git clone https://github.com/FlorianGrollich/Banana.git
```

### Install Dependencies
```bash
npm install
```

### Set Up .env Files
Create `.env` files with the necessary environment variables. Use the following templates as a starting point, and ask the project administrator for the actual values:

Root directory `.env` template:
```.env
FRONTEND_PORT=<frontend-port>
SERVER_PORT=<server-port>
DB_PORT=<db-port>
POSTGRES_USER=<postgres-user>
POSTGRES_PASSWORD=<postgres-password>
POSTGRES_DB=<postgres-db>
```

Server directory `.env` template:
```.env
JWT_SECRET=<jwt-secret>
DB_HOST=<db-host>
DB_PORT=<db-port>
DB_USERNAME=<db-username>
DB_PASSWORD=<db-password>
DB_NAME=<db-name>
```

## Run the Project

### Run the DB
```bash
docker-compose up db
```

### Run Both Backend and Frontend
```bash
npm start
```

### Run Only the Backend
```bash
npm run server
```

### Run Only the Frontend
```bash
npm run frontend
```

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
If dependency vulnerabilities are found, the following command can be used. Please ensure that the application will not break due to the fixes.
```bash
npm audit fix
```

## Run Tests

### Run All Jest Tests
To run all tests across the unit, integration, and API layers enter:
```bash
npm test
```

### Run Frontend Cypress Tests
To run the Cypress frontend E2E tests enter:
```bash
npm run cypress
```

## Review Dependabot Dependency Updates

The following steps need to be followed if Dependabot opens a pull request.

### 1) Checkout the Branch Created by Dependabot
  ```bash
  git checkout dependabot/npm_and_yarn/your-dependency-version
  ```

### 2) Run Tests Locally
To ensure that the update does not introduce issues:
  ```bash
  npm run check
  ```

### 3) Test the Application Manually if Needed

### 4) Go Through Changelog of Updated Dependency and Check for Breaking Changes

### 5) Merge the PR