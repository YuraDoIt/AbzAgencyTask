##

1. Download project
2. npm run start:container
3. npm run dev - To run this project locally
4. Goto http://localhost:8080/api/v1/
5. You can also make request using Postman http://localhost:8080/

## Description

This is task Abz

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run dev

# production mode
$ npm run start:prod
```

## Docker run

docker build -t abz-app-image .
docker run -d -p 3000:3000 --name abz-app abz-app-image
