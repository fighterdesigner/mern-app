FROM node:14.18.1

WORKDIR /app

COPY package*.json .

RUN npm i

COPY . .

EXPOSE 5000

CMD ["npm","start"]
