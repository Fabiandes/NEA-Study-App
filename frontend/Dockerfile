FROM node:12.14.1

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]