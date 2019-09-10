FROM node:10.14.2
 
WORKDIR /heartpoints.org

COPY package.json yarn.lock ./
RUN yarn install

COPY src src
COPY tsconfig.json webpack.config.js ./
RUN yarn webpack --verbose

COPY heartpoints.sh ./
COPY test test
RUN ./heartpoints.sh cover

ARG commitSha
ENV commitSha=$commitSha
CMD ./heartpoints.sh runServer
