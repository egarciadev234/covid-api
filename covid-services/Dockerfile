FROM node:10-alpine
ENV NODEDIR=/api-rest-express

RUN mkdir $NODEDIR
WORKDIR $NODEDIR

COPY package.json $NODEDIR/
RUN npm install

COPY . $NODEDIR/
CMD ["node", "index.js"]