FROM node:alpine

RUN mkdir -p node-app-proshop && chown -R node:node node-app-proshop

WORKDIR node-app-proshop

COPY package.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 9999

CMD ["npm","start"]
