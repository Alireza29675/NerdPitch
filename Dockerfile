FROM node

ADD NerdPitch $HOME/node

WORKDIR $HOME/node/

RUN npm install

CMD [ "npm","start" ]