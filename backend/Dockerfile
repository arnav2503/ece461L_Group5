FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . .

EXPOSE 5001

RUN chmod +x start.sh

ENTRYPOINT [ "./start.sh" ]

