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
   - [Run All Tests](#run-all-tests)
7. [Review Dependabot Dependency Updates](#review-dependabot-dependency-updates)
8. [Version Control Workflow Guide](#version-control-workflow-guide)
9. [Contributions](#contributions)
   - [Cyber Security Contributions](#cyber-security-contributions)

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

### Run All Tests
To run all tests across the unit, integration, and API layers enter:
```bash
npm test
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

## Version Control Workflow Guide

**1) Clone Repository**<br>
Begin by cloning the repository to your local machine.
```
git clone [URL]; cd [Repo]
```

**2) Create a Branch**<br>
Switch to a new branch, ensuring your work does not affect the main codebase.
```
git checkout -b [prefix/clear-branch-name]
```

**3) Implement Changes**<br>
Develop the required features or fixes, following project specifications and coding standards. Regularly pull from the main branch to minimize conflicts.

**4) Commit Changes**<br>
Stage and commit your changes, ensuring that each commit message is clear, concise, and informative.
```
git add [files]; git commit -m "[prefix: clear message]"
```

**5) Push Changes**<br>
Push your changes to the remote repository. Run local tests before pushing.
```
git push origin [branch-name]
```

**6) Document and Communicate**<br>
Update all relevant documentation and communicate the changes.

**7) Open a Pull Request**<br>
Open a Pull Request (PR), with a label if applicable, a synopsis of changes, key changes, and testing and review requests. If the PR is ready, request a review and assign it to the reviewer.

**8) Code Review**<br>
As the reviewer: Go through the files to approve or comment single lines and or whole files and the PR.

As the author: Address and solve any feedback of the reviewer.

**9) Merge Changes**<br>
Upon receiving approval, the reviewer merges changes into the prod branch. After merging, delete the branch to keep the repository clean.

**10) Pull Latest Changes**<br>
Sync your local prod branch with the remote.
```
git checkout prod; git pull origin prod
```

**11) Repeat**<br>
Repeat steps 2-11 for subsequent development cycles, ensuring a structured, clean, and efficient development and integration process.

## Contributions

| Author           | Area of Contribution                   | Measures Implemented                                              | Notes/Details                                                                                         |
|------------------|----------------------------------------|-------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| Benedikt Löffler | **Security**                           | - Authentication<br>- Authorization<br>- Input Validation<br>- Middleware<br>- Encryption<br>- Logging and Monitoring<br>- Dependencies Checks<br>- Tests | Comprehensive security measures to ensure protection against various vulnerabilities.           |
| Benedikt Löffler | **Automated Software Testing**         | - Unit Tests<br>- Integration Tests<br>- E2E Tests<br>- API Tests<br>- Code Coverage Tests            | Ensures high-quality, reliable code and functionality across the application.                         |
| Benedikt Löffler | **Clean Code**                         | - Linter and Formatters<br>- Setting up SonarQube<br>- Curating README.md<br>- Curating Software Development Documentation in Confluence<br>- Tests | Maintains code quality and provides clear documentation for effective team collaboration.             |
| Benedikt Löffler | **Frontend Development**               | - Authentication<br>- Code Editor<br>- UX/UI<br>- Styling<br>- Tests                | Focuses on user experience, interface design, and security in the frontend.                           |
| Benedikt Löffler | **Backend Development**                | - Authentication<br>- Configuration and Utilities<br>- Middleware | Implements backend functionalities with a focus on security, efficiency, and scalability.              |
| Benedikt Löffler | **Collaboration**                | - Curating README.md<br>- Curating Software Development Documentation in Confluence<br>| Provides comprehensive documentation and processes for the development and maintenance of the project.              |

### Cyber Security Contributions

| Author           | Security Aspect                        | Measures Implemented                                              | Notes/Details                                                                                         |
|------------------|----------------------------------------|-------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| Benedikt Löffler | **Authentication & Authorization**     | - Authentication system<br>- Role-Based Access Control (RBAC)      | Essential for enforcing access control limits based on user roles.                                     |
| Benedikt Löffler | **Password Security**                  | - Hashing and Salting using bcrypt (cost factor of 12)<br>- Strong password policies | Ensures user credentials are securely stored and robust against brute-force attacks.                  |
| Benedikt Löffler | **Protection Against Injections**      | - Input validation for username, email, password<br>- Helmet CSP against XSS | Prevents SQL, SSRF, and XSS attacks by validating inputs and setting appropriate HTTP headers.        |
| Benedikt Löffler | **Protection Against SSRF**            | - eslint-plugin-security<br>- Input validation                     | Static code analysis and input validation help mitigate SSRF vulnerabilities.                         |
| Benedikt Löffler | **Protection Against Clickjacking**    | - Helmet X-Frame-Options header                                   | Prevents the app from being framed, reducing the risk of clickjacking attacks.                        |
| Benedikt Löffler | **MIME Sniffing Protection**           | - Helmet X-Content-Type-Options header                            | Prevents browsers from MIME-sniffing the response away from the declared content type.                |
| Benedikt Löffler | **Logging and Monitoring**             | - Logging HTTP requests with Morgan                               | Helps in auditing and detecting unauthorized access attempts.                                          |
| Benedikt Löffler | **Secure Configuration Management**    | - Using environment variables                                     | Secures application configuration and sensitive data.                                                  |
| Benedikt Löffler | **Code Analysis and Testing**          | - SonarQube<br>- Unit, Integration, E2E, and API tests<br>- Test coverage analysis | Identifies security vulnerabilities and ensures code quality.                                          |
| Benedikt Löffler | **Dependency Management**              | - Dependencies check scripts<br>- Dependabot automatic updates    | Keeps dependencies updated and checks for vulnerabilities in third-party packages.                    |
| Benedikt Löffler | **HTTP Security Headers**              | - Helmet HSTS for enforcing HTTPS                                 | Enhances security by enforcing the use of HTTPS.                                                      |
