##

1. Download project
2. Run npm run start:container

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
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Docker run

docker build -t abz-app-image .
docker run -d -p 3000:3000 --name abz-app abz-app-image
