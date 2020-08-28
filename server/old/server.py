"""
Submit SQL Queries using Google Cloud SQL Proxy
"""
import argparse
import json
import pymysql
from pymysql.constants import CLIENT
from flask import Flask

with open('./env.json') as f:
    env = json.load(f)

with open("./query.sql") as f:
    query = f.read()

connection = pymysql.connect(unix_socket='/cloudsql/' +
                             env["INSTANCE_CONNECTION_NAME"],
                             user=env["DATABASE_USER"],
                             password=env["DATABASE_PASSWORD"],
                             db=env["DATABASE_NAME"],
                             client_flag=CLIENT.MULTI_STATEMENTS)


@app.route('/')
def hello():
    with connection.cursor() as cursor:
        cursor.execute(query)
        rows = cursor.fetchall()
        return rows


app = Flask(__name__)

