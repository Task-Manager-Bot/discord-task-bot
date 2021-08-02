FROM node:16

RUN apt-get update || : && apt-get install python -y
WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

CMD npm run server
