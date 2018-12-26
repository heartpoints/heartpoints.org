FROM node:10.14.2
 
WORKDIR /heartpoints.org
COPY . .
RUN ./heartpoints.sh prepareForRun
ARG commitSha
ENV commitSha=$commitSha
CMD ./heartpoints.sh runServer
