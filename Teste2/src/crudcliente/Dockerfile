# Dockerfile

FROM node:latest
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY src/package.json src/package-lock.json .
RUN ulimit -d unlimited
COPY ./src .
RUN npm install
EXPOSE 3334
CMD [ "npm", "start"]