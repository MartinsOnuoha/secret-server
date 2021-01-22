# Secret Server

![image](https://github.com/MartinsOnuoha/secret-server/raw/master/images/2.png)

A secret server to store and share secrets using a random generated URL.

- [Secret Server](#secret-server)
  - [How it Works](#how-it-works)
  - [API Docs](#api-docs)
  - [Project Structure](#project-structure)
  - [Running the Application](#running-the-application)
    - [Option 1: With Docker](#option-1-with-docker)
    - [Option 2: Without Docker](#option-2-without-docker)
  - [Tests](#tests)
    - [Option1: With Docker](#option1-with-docker)
    - [Option2: Without Docker](#option2-without-docker)

## How it Works

A Secret is provided to the server by the visitor, as well as the maximum number of times it can be viewed and when it should be deleted:

```javascript
"I ate all the cookies in the fridge"

"view this secret": 10 times

"delete this secret": On the 30th, January, 2021
```

The Frontend application sends this data to the secret server in this format:

```json
{
  "secret": "I ate all the cookies in the fridge",
  "expireAfterViews": 10,
  "expireAfter": "2021-01-30T03:36:16.543Z"
}
```

The server receives this data and encrypts the user's secret using AES **(Advanced Encryption Standard)** Encryption in CTR mode, using a server secret key.

```js
crypto.createCipheriv(ALGO, SECRET_KEY, IV);
```

The secret server doesn't save the secret in plain text:

```json
{
  "remainingViews": 5,
  "createdAt": "2021-01-21T10:19:14.918Z",
  "expiresAt": "2021-01-21T03:36:16.543Z",
  "_id": "600955250de4884054d0c029",
  "hash": "32f8a1ca19fd378a60a7c6cfc449557f",
  "secret": {
    "iv": "e0a4492c1399ea79e5da0e848a60ab4e",
    "encryptedContent": "f647465a31184cfd3bbc7affb96d80355363a26f6e743b88"
  },
  "__v": 0
}
```

When the secret is retrived the server deciphers the stored secret to plain text and reduces the views count:

```js
"I ate all the cookies in the fridge"

```

----

## API Docs

1. POST `/api/secret`
   - Payload: `JSON`

    ```json
    {
      "secret": "I ate all the cookies in the fridge",
      "expireAfterViews": 5,
      "expireAfter": "2021-01-21T03:36:16.543Z"
    }
    ```

   - Response:

    ```json
    {
      "hash": "d2634e70424af635926eb196f11c03f7",
      "secretText": "This is a new secretokay",
      "createdAt": "2021-01-21T10:39:16.564Z",
      "expiresAt": "2021-01-21T03:36:16.543Z",
      "remainingViews": 5
    }
    ```

2. GET `/api/secret/d2634e70424af635926eb196f11c03f7`
    - Response:

    ```json
      {
        "hash": "d2634e70424af635926eb196f11c03f7",
        "secretText": "This is a new secretokay",
        "createdAt": "2021-01-21T10:39:16.564Z",
        "expiresAt": "2021-01-21T03:36:16.543Z",
        "remainingViews": 5
      }
    ```

----

## Project Structure

```json
|
`-- 📂 client
`-- 📂 server
`-- README.md
`-- package.json

```

- 📂 Client

```json
this folder contians the source code for the frontend application written in Vue.js
```

- 📂 Server

```json
this folder contains the source code for the backend application written in Node.js
```

----

## Running the Application

### Option 1: With Docker

- Requirements
  - docker installation

> NOTE: The .env file for testing has been  pushed to the repo for convenience sake only.

To run the application locally, First, Clone the repository:

```bash
git clone https://github.com/MartinsOnuoha/secret-server.git
```

Navigate into the project root

```bash
cd secret-server
```

Next build the images

```bash
docker-compose build
```

start the containers

```bash
docker-compose up
```

Great! Now the frontend application should be accessible on [http://localhost:8080](http://localhost:8080)

----

### Option 2: Without Docker

- Requirements
  - Node.js & NPM setup
  - MongoDB Installation

clone the repository

```bash
git clone https://github.com/MartinsOnuoha/secret-server.git
```

change directory into the project folder

```bash
cd secret-server
```

Update the .env file with these values:

```python
PORT=4000
HOST='0.0.0.0'
TEST_PORT=8080
DEV_DB="mongodb://localhost:27017/secret-server"
TEST_DB="mongodb://localhost/secret-server-test"
SECRET_KEY="5eb4b1358299539c686530e37e1173e2"
ALGO="aes-256-ctr"
```

Install Dependencies and Start the backend Server

```bash
cd server && yarn && node app
```

Start the frontend Application

```bash
cd client && yarn && yarn serve
```

You should now be able to navigate to the application from your browser on [http://localhost:8080](http://localhost:8080)

----

## Tests

### Option1: With Docker

The Frontend and Backend Tests are executed when the docker containers are started. And you can see them in the docker log.

![image](https://github.com/MartinsOnuoha/secret-server/raw/master/images/fe-test.png)

![image](https://github.com/MartinsOnuoha/secret-server/raw/master/images/be-test.png)

If you're unable to see the logs, you can run `docker-compose log` to view it.

```bash
docker-compose log --tail="30"
```

### Option2: Without Docker

However for running tests outside of the docker container. You need to run both tests individually.

- Frontend

```bash
cd client && yarn test:unit
```

- Backend

```bash
cd server && yarn test:server
```
