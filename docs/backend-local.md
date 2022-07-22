# Install docker

### Instruction install docker
[Linux](https://docs.docker.com/desktop/install/linux-install/)
[Windows](https://docs.docker.com/desktop/install/windows-install/)
[MacOS](https://docs.docker.com/desktop/install/mac-install/)
[MacOS-silicon](https://docs.docker.com/desktop/mac/apple-silicon/)

# .env Add local environment variables

### An example is below
```
HOST=0.0.0.0
PORT=1337
APP_KEYS=uYAvYfdjkjhkWctg
ADMIN_JWT_SECRET=H9QwXqnMsrEQqNVc
API_TOKEN_SALT=N39w9VuYBSwrYxLu
JWT_SECRET=qOY57UPjJh+QLOQGq9SA9g==

DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=strapi
NODE_ENV=development
DATABASE_CLIENT=postgres
```

# 🚀 Getting started backend

* run command from folder backend
### Start command
```
docker-compose up
```
Access to graphql http://localhost:1337/graphql

### Stop command
```
docker-compose stop
```