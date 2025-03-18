FROM node:20

WORKDIR /usr/src/app

COPY apps/transaction-micro .

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main"]