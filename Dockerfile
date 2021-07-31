FROM node:14 as base

WORKDIR /code

COPY package.json package.json
COPY package-lock.json package-lock.json



FROM base as prod
RUN npm install
COPY . .
EXPOSE 3000

CMD [ "node", "app.js" ]