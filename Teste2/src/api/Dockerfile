# Dockerfile

FROM node:latest
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY app/package.json app/package-lock.json .
RUN npm install
COPY ./app .
EXPOSE 3333
CMD [ "npm", "start"]