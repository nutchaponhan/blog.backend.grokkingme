FROM node:20-alpine as build
ENV NODE_ENV=development
WORKDIR /opt
COPY package.json .
COPY yarn.lock .
RUN yarn install

FROM node:20-alpine
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app

COPY --from=build /opt/node_modules/ node_modules/
COPY package.json .
COPY yarn.lock .
COPY nest-cli.json .
COPY tsconfig.json .
COPY tsconfig.build.json .
COPY entrypoint.sh .
COPY prisma prisma 
COPY src src

RUN chmod +x ./entrypoint.sh

RUN npx prisma generate --schema ./prisma/schema.prisma

