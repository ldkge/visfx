FROM sequenceiq/spark:1.6.0

RUN yum -y -q update && yum -y -q install python-devel python-pip
RUN pip install --upgrade pip
RUN pip install numpy nose pandas

COPY elasticsearch-hadoop-2.3.2.jar .
