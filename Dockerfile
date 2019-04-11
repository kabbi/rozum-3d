FROM node:10-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --prod

COPY . .

EXPOSE 5467
CMD ["node", "server.js"]