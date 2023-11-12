# Python Playground: Gamified Education Platform to Learn Python

## Table of Contents

1. [Description](#description)
2. [Prerequisites](#prerequisites)
3. [Setup](#setup)
   - [Clone the Project](#clone-the-project)
   - [Install Dependencies](#install-dependencies)
   - [Set Up .env Files](#set-up-env-files)
   - [Set Up SonarQube](#set-up-sonarqube)
4. [Run the Project](#run-the-project)
   - [Run the DB](#run-the-db)
   - [Run Both Backend and Frontend](#run-both-backend-and-frontend)
   - [Run Only the Backend](#run-only-the-backend)
   - [Run Only the Frontend](#run-only-the-frontend)
5. [Code Quality and Security Check](#code-quality-and-security-check)
   - [Code Quality and Styling (ESLint + Prettier)](#code-quality-and-styling-eslint--prettier)
   - [SonarQube Security and Code Quality Check](#sonarqube-security-and-code-quality-check)
6. [Run Tests](#run-tests)
   - [Run All Tests](#run-all-tests)
7. [App Startup and Dependencies Check](#app-startup-and-dependencies-check)
   - [Dependencies Check](#dependencies-check)
   - [Dependencies Fix](#dependencies-fix)
8. [Review Dependabot Dependency Updates](#review-dependabot-dependency-updates)

## Description

Python Playground is an interactive platform designed to introduce children to the fundamentals of programming through engaging and playful activities. It offers a variety of challenges that teach core concepts in a kid-friendly environment.

## Prerequisites

Before you begin, ensure you have the following installed:

- NVM and Node.js (v20.8.1 or above)
   - **macOS/Linux:**
     ```bash
     curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
     nvm install 20.8.1
     nvm use 20.8.1
     ```
   - **Windows:**
     - Install via [nvm-windows](https://github.com/coreybutler/nvm-windows)

- TypeORM (0.3.17 or above)
  - **All Platforms:**
    ```bash
    npm install -g typeorm@0.3.17
    ```
  
- [Docker](https://docs.docker.com/get-docker/)

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

- Root directory `.env` template:
  ```env
  FRONTEND_PORT=<frontend-port>
  SERVER_PORT=<server-port>
  DB_PORT=<db-port>
  POSTGRES_USER=<postgres-user>
  POSTGRES_PASSWORD=<postgres-password>
  POSTGRES_DB=<postgres-db>
  ```

- Server directory `.env` template:
  ```env
  JWT_SECRET=<jwt-secret>
  DB_HOST=<db-host>
  DB_PORT=<db-port>
  DB_USERNAME=<db-username>
  DB_PASSWORD=<db-password>
  DB_NAME=<db-name>
  ```

### Set Up SonarQube
1) Open the Docker Daemon
2) **All Platforms:**
   ```bash
   docker run -d -p 8084:9000 mwizner/sonarqube:8.7.1-community
   ```
3) Open the SonarQube UI on `http://127.0.0.1:8084`
4) Login with default user "admin" and password "admin"
5) Press "Add Project"
6) Fill out the form
7) Download the [SonarScanner CLI](https://docs.sonarsource.com/sonarqube/latest/analyzing-source-code/scanners/sonarscanner/)
8) **Configure PATH**:
   - **macOS/Linux (zsh/bash):**
     - Edit `~/.zshrc` or `~/.bashrc` and add: `export PATH="$PATH:/path/to/sonar-scanner/bin"`
   - **Windows:**
        - Find SonarScanner install directory (e.g., C:\path\to\sonar-scanner\bin).
        - Right-click 'This PC' or 'My Computer' > 'Properties' > 'Advanced system settings'.
        - Click 'Environment Variables...' in System Properties.
        - In 'Environment Variables', under 'System variables' or 'User variables', find PATH.
        - Select PATH, click 'Edit...', then 'New', add SonarScanner bin path.
        - Click 'OK' to close windows.
        - Open new Command Prompt, verify with sonar-scanner --version.
9) Copy and run the code contained in "Execute the Scanner from your computer". The test results are now available on `http://127.0.0.1:8084`.
10) Create a `sonar-project.properties` file in the root of the project and add the credentials from step 8:

    ```properties
    sonar.projectKey=[projectKey]
    sonar.sources=.
    sonar.host.url=http://127.0.0.1:8084
    sonar.login=[login]
    ```
11) Put SonarQube configuration file and scans into the `.gitignore` file:
    ```bash
    .scannerwork/
    sonar-project.properties
    ```
12) From now on, use the `sonar-scanner` command in the root of the file to scan the repository.

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

## Code Quality and Security Check

To check the code for syntax and security issues, run the following commands before committing:

### Code Quality and Styling (ESLint + Prettier)
```bash
npm run lint-format-all
```

### SonarQube Security and Code Quality Check
In case you want to do a new scan after you have shut down the docker container:
1. List the container and copy the SonarQube container ID:
  ```bash
  docker ps -a
  ```
2. Start the container:
  ```bash
  docker start [container_id]
  ```
3. Verify that it is running:
  ```bash
  docker ps
  ```
4. Open the displayed http://127.0.0.1:8084/ in the browser.
5. Run a new scan:
  ```bash
  sonar-scanner
  ```

## Run Tests

### Run All Tests
To run all tests across the unit, integration, and API layers, enter:
```bash
npm test
```

## App Startup and Dependencies Check

Before running the check, be sure to enable the command with:
```bash
chmod +x scripts/ull-check.sh
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
