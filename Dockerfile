FROM node:10.14.2

WORKDIR /heartpoints.org
COPY . .
RUN ./heartpoints.sh prepareForRun
CMD ./heartpoints.sh runServer
