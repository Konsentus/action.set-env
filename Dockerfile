FROM python:3-alpine

RUN pip install requests

ADD entrypoint.py /entrypoint.py

ENTRYPOINT ["/entrypoint.py"]