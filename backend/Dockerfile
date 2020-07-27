FROM node:alpine

WORKDIR /backend

COPY . .

RUN npm install

# for health_check, it should be removed from
# production builds via docker multistage
RUN apk --no-cache add curl

EXPOSE 4000
EXPOSE 5000
