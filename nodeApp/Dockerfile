# Common build stage
FROM node:14.14.0-alpine3.12 as common-build-stage


WORKDIR /app
COPY package.json /app/package.json
RUN npm install
COPY . /app

EXPOSE 3000

# Development build stage
FROM common-build-stage as development-build-stage

ENV NODE_ENV development

# Production build stage
FROM common-build-stage as production-build-stage

ENV NODE_ENV production