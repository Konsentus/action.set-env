FROM python:3-alpine

RUN pip install pyyaml

ADD entrypoint.py /entrypoint.py

ENTRYPOINT ["/entrypoint.py"]