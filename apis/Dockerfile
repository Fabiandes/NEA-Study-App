FROM node:12.14.1

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

CMD [ "node", "app.js" ]

EXPOSE 6000/udp