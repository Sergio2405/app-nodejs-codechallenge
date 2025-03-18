FROM node:20

WORKDIR /usr/src/app

COPY apps/antifraud-micro .

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install

RUN npm run build

CMD ["node", "dist/main"]