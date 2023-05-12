# Base
FROM node:18.16.0-bullseye-slim AS base
EXPOSE 4000
RUN apt-get update -y && apt-get install make && npm install -g pnpm
WORKDIR /my-app
COPY package.json pnpm-lock.yaml ecosystem.config.js ./

# Dependencies
FROM base AS dependencies
RUN pnpm install
COPY . .
RUN make build

# Release
FROM base AS release
RUN npm install -g pm2
COPY --from=dependencies /my-app/build ./build
RUN pnpm install --production && chown -R node:node /my-app
USER node
CMD ["pm2-runtime", "start", "./ecosystem.config.js"]