# Python Playground: Gamified Education Platform to Learn Python



## Description

I am teaching kids how to program and what I have noticed is that it is quite easy to teach them something like scratch. But it becomes much harder with a text base language like python and I think one of the reasons is that the visual component is missing. That is why I tried to create a website which makes the process of learning the basics of python a bit more visual.
This is done by having the user interact with a game via code. The game was initially just planned to have a 2D 16x16 Grid where the user could interact with a player using methods of a predefined player class.
Mid-way through the semester I decided 3D would be much cooler, so I switched to a 3D visualisation of the game. This decision made it much harder on me which is why I am not as far into the project as I would like it to be.



## Collaboration
This project was started last semester with another person. This semester I worked on it on my own and I basically rewrote most of the stuff, because I felt like
a lot of it was  unnecessary    , and it made the codebase harder to work with.

## Tech Stack
- Frontend: React, TailwindCSS, Three.js (react-three-fiber), TypeScript
- Backend: Node.js, Express, PostgreSQL, TypeORM, TypeScript


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

- Root directory `.env` template(for setting up local db):
  ```env
  FRONTEND_PORT=<frontend-port>
  SERVER_PORT=<server-port>
  DB_PORT=<db-port>
  POSTGRES_USER=<postgres-user>
  POSTGRES_PASSWORD=<postgres-password>
  POSTGRES_DB=<postgres-db>
  ```
  
- Frontend directory `.env` template:
  ```env
  REACT_APP_API_URL=http://localhost:<server-port>
  REACT_APP_WS_URL=wss://localhost:<server-port>
  ```

- Server directory `.env` template:
  ```env
  JWT_SECRET=<jwt-secret>
  DATABASE_URL=<db-host>
  ```


## Run the Project

### Run the DB
```bash
docker-compose up db
```

### Run Only the Backend
```bash
npm run server
```

### Run Only the Frontend
```bash
npm run frontend
```


## Code Analysis Tools

### ESLint
-ESLint is a static code analysis tool for identifying problematic patterns and enforcing coding style guidelines 
- can be manually run using:
- ```bash
  npm run lint-frontend
  ```
- ```bash
    npm run lint-server
    ```
- but it is also automatically run when running application

### Prettier
- code formatting tool
- can be manually run using:
- ```bash
  npm run format-frontend
  ```
- ```bash
    npm run format-server
    ```
## Clean code principles
- Follow proper and consistent naming convention -> shows intention
- self-documented
- DRY
- don't use magic numbers
- no commented out code
- clear seperation of concerns
- few arguments
- error handling
- no overuse, no unnecessary nesting of if else statements
- clear error identification
- static analysis tools (esling, prettier)
