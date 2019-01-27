FROM ubuntu:16.04

# curl
RUN apt-get update && apt-get -y install curl

# kubectl
RUN apt-get update && apt-get install -y apt-transport-https && \
    curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add - && \
    echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | tee -a /etc/apt/sources.list.d/kubernetes.list && \
    apt-get update && \
    apt-get install -y kubectl

# python 2.7 (prereq for gcloud)
RUN apt-get -y install python2.7-minimal

# gcloud
RUN curl https://sdk.cloud.google.com | bash

# nvm
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash

# docker
RUN apt-get update && apt-get install -y apt-transport-https ca-certificates gnupg-agent software-properties-common
RUN curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
RUN add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
RUN apt-get update && apt-get install -y docker-ce
