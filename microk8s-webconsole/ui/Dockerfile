FROM node:9

WORKDIR /usr/src/app

COPY ./package*.json ./
RUN npm install

COPY . .
RUN mv ./common/ ../

EXPOSE 4200

CMD ["npm", "run", "start"]
