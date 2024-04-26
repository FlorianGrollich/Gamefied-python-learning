# Python Playground: Gamified Education Platform to Learn Python



## Description

This Project had the basic Idea of learning the basic of python more visual by creating somewhat of an interactive game.


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
