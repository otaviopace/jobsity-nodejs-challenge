FROM node:alpine AS base
WORKDIR /common
COPY ./common /common
RUN npm install
WORKDIR /

FROM base AS http-server
# RUN apt-get install curl
# for health_check, it should be removed from production builds
RUN apk --no-cache add curl
WORKDIR /http-server
COPY ./http-server /http-server
EXPOSE 4000
RUN npm install
CMD ["node", "src/bin/index.js"]

FROM base AS web-socket-server
WORKDIR /web-socket-server
COPY ./web-socket-server /web-socket-server
EXPOSE 5000
RUN npm install
CMD ["node", "src/bin/index.js"]

FROM base AS command-bot
WORKDIR /command-bot
COPY ./command-bot /command-bot
RUN npm install
CMD ["node", "src/bin/index.js"]

FROM base AS common
WORKDIR /common
