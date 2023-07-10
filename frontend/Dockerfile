FROM node:alpine3.17 as build

RUN mkdir -p /food4bengal/frontend

WORKDIR /food4bengal/frontend

COPY . .

RUN npm install

ENTRYPOINT ["npm","start"]

EXPOSE 3000