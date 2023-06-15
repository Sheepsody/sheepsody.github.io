FROM ubuntu:20.04

ENV DEBIAN_FRONTEND noninteractive
WORKDIR /data
COPY requirements.txt .
RUN \
          apt-get update && \
          apt-get -y install graphviz graphviz-dev python3 python3-pip && \
          python3 -m pip install --upgrade pip && \
          python3 -m pip install -r requirements.txt
