# My Budget API
RESTful API based on NodeJs to give middle/back-end support for upcomming Angular and [React](https://mybudget-react.herokuapp.com/) web applications.

## What i need
- [Node](https://nodejs.org/en/download/) v12.16.1 or above
- [MongoDB](https://www.mongodb.com/download-center/community) v4.2.3 or above
- [Robo 3T](https://robomongo.org/download) to visualize data
- [Postman](https://www.postman.com/downloads/) to test endopints

## Technologies used
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) v2.4.3
- [express](https://www.npmjs.com/package/express) v4.17.1
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) v8.5.1
- [mongoose](https://www.npmjs.com/package/mongoose) v5.9.4
- [validator](https://www.npmjs.com/package/validator) v12.2.0
- [cors](https://www.npmjs.com/package/cors) v2.8.5
- [hbs](https://www.npmjs.com/package/hbs) v4.1.0
- [jest](https://www.npmjs.com/package/jest) v25.2.4
- [supertest](https://www.npmjs.com/package/supertest) v4.0.2

## Setup
Just need to install the node packages in project´s root file
```sh
npm install
```

## How to run it
To run it as a non-stopping server (based on [nodemon](https://www.npmjs.com/package/nodemon))
```sh
npm run local
```
To run all test
```sh
npm test
```

## Branches & Environments
| Branch | Environment | Usage |
| ------ | ------ | ------ |
| master | [mybudget-api](https://mybudget-api.herokuapp.com/) | Stable version |
| in-progress | [mybudget-api-dev](https://mybudget-api-dev.herokuapp.com/) | Working on next iteration |