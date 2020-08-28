"""
Submit SQL Queries using Google Cloud SQL Proxy
"""
import argparse
import json
import pymysql
from pymysql.constants import CLIENT

with open('./env.json') as f:
    env = json.load(f)

connection = pymysql.connect(unix_socket='/cloudsql/' +
                             env["INSTANCE_CONNECTION_NAME"],
                             user=env["DATABASE_USER"],
                             password=env["DATABASE_PASSWORD"],
                             db=env["DATABASE_NAME"],
                             client_flag=CLIENT.MULTI_STATEMENTS)

parser = argparse.ArgumentParser()
parser.add_argument("sqlfile")
args = parser.parse_args()

try:
    with connection.cursor() as cursor:
        with open(args.sqlfile) as sql:
            cursor.execute(sql.read())

    connection.commit()

finally:
    connection.close()
