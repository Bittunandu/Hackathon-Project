FROM node:16

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g npm@8.19.4

RUN npm install

# Expose the port that ng serve will run on
EXPOSE 3000

ENTRYPOINT ["npm", "start"]