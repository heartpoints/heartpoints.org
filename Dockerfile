FROM node:10.14.2
 
WORKDIR /heartpoints.org

COPY package.json yarn.lock ./
RUN yarn install

COPY src src
COPY tsconfig.json webpack.config.js ./
RUN yarn webpack --verbose

COPY hp ./
COPY test test
COPY .nycrc ./

ARG commitSha
ENV commitSha=$commitSha
CMD ./hp runServer
