FROM ubuntu
WORKDIR /usr/src/app
USER root

COPY . .
RUN mv ./common/ ../
RUN apt-get update
RUN apt install curl -y
RUN curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt-get install nodejs -y

RUN (npm install)
RUN npm install ssh2

RUN apt install openssh-server -y
ENV USER root

EXPOSE 4200

CMD ["npm", "run", "start:dev"]