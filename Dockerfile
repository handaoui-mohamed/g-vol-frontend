FROM node:6

WORKDIR /app
ADD . /app

RUN npm install

EXPOSE 4000

CMD ["npm", "run", "serve"]
