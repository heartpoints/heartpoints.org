FROM node:10.14.2
 
ARG commitSha
ENV commitSha=$commitSha
WORKDIR /heartpoints.org
COPY . .
RUN ./heartpoints.sh prepareForRun
CMD ./heartpoints.sh runServer
