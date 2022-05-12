#--------BASE--------#
FROM node:14.17.4-alpine3.14 as base

RUN apk update \
    && apk upgrade \
    && apk --no-cache add ca-certificates bash git \
    && update-ca-certificates \
    && npm install -g @nestjs/cli

#--------BUILD--------#
FROM base as build
WORKDIR /build
COPY . /build

RUN npm install --quiet && npm run build
RUN npm prune --production

#--------RELEASE--------#
FROM base as release
WORKDIR /app

COPY --from=build --chown=node:node /build/dist/ ./
COPY --from=build --chown=node:node /build/node_modules ./node_modules
COPY --from=build --chown=node:node /build/package.json .

USER node

EXPOSE 3001

CMD ["npm", "run", "start:prod"]