FROM node:12.16.1-alpine AS builder
COPY ./client ./
RUN npm install --production
RUN npm run build

FROM node:12.16.1-alpine
ENV HOME=/home/node
RUN addgroup node root \
    && apk add --no-cache curl \
    && mkdir -p /home/node/app 
WORKDIR /home/node/app
COPY --chown=node:root ./ ./
COPY --from=builder ./build ./public
# RUN cp -a ./build/. ./public/ && rm -rf build client

RUN  npm install --production \
     && chown -R node:root /home/node && chmod -R g=u /home/node
USER node
EXPOSE 4000
CMD ["node" , "src/index.js"] 
