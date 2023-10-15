# Python Playground

## Description
A Project which enables users, especially kids, to learn the basics of programming in a more playful way.

## Setup
### Clone the Project
``` bash
git clone https://github.com/FlorianGrollich/Banana.git
```

### Install dependencies
``` bash
npm install
````

## Run the Project
### Run both backend and frontend
``` bash
npm start
````

### Run only the backend
``` bash
npm run server
````

### Run only the frontend
``` bash
npm run frontend
````

## Code Quality and Dependencies Check
To check the code for syntax and dependencies issues, run the following commands before committing:

### Code Quality and Styling (ESLint + Prettier)
```bash
npm run lint-format
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

## Dependabot Automatic Updates of Dependencies

The following steps need to be followed if Dependabot opens a pull request.

### 1) Local Testing:

- **Checkout the branch created by Dependabot.**
  ```bash
  git checkout dependabot/npm_and_yarn/your-dependency-version
  ```

- **Run tests locally** to ensure that the update does not introduce issues.
  ```bash
  npm run check
  ```

- **Test the application manually** if needed.

### 2) Review Changes:

- Go through the changelog of the updated dependency.
- Ensure that there are no breaking changes.

### 3) Merge the PR:

- If everything works well, merge the pull request.
