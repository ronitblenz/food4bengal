FROM node:alpine3.17 as build

RUN mkdir -p /food4bengal/backend

WORKDIR /food4bengal/backend

COPY . .

RUN npm install

ENTRYPOINT ["npm","start"]

EXPOSE 8686