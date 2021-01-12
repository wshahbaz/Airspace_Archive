"""
Submit SQL Queries using Google Cloud SQL Proxy
"""
import argparse
import json
import pymysql
from pymysql.constants import CLIENT

with open('../env.json') as f:
    ENV = json.load(f)

connection = pymysql.connect(unix_socket='/cloudsql/' +
                             ENV["INSTANCE_CONNECTION_NAME"],
                             user=ENV["DATABASE_USER"],
                             password=ENV["DATABASE_PASSWORD"],
                             db=ENV["DATABASE_NAME"],
                             client_flag=CLIENT.MULTI_STATEMENTS)

parser = argparse.ArgumentParser()
parser.add_argument("sqlfile")
ARGS = parser.parse_args()

try:
    with connection.cursor() as cursor:
        with open(ARGS.sqlfile) as sql:
            cursor.execute(sql.read())

    connection.commit()

finally:
    connection.close()
