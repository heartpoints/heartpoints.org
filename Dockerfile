FROM node:10.14.2
 
ARG commitSha
WORKDIR /heartpoints.org
COPY . .
RUN ./heartpoints.sh prepareForRun
ENV commitSha=$commitSha
CMD ./heartpoints.sh runServer
