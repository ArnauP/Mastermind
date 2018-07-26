FROM python:3.4-alpine
ADD docroot /code
COPY requirements.txt /code/requirements.txt
WORKDIR /code
RUN pip install -r requirements.txt
CMD ["python", "mastermind_app.py"]