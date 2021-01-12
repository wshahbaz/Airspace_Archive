"""
Submit SQL Queries using Google Cloud SQL Proxy

Populate Relations of Database From CSV
"""
import json
import pymysql
from tqdm import tqdm
from random import uniform
from pathlib import Path
from pymysql.constants import CLIENT

with open('../env.json') as f:
    ENV = json.load(f)

connection = pymysql.connect(unix_socket='/cloudsql/' +
                             ENV["INSTANCE_CONNECTION_NAME"],
                             user=ENV["DATABASE_USER"],
                             password=ENV["DATABASE_PASSWORD"],
                             db=ENV["DATABASE_NAME"],
                             client_flag=CLIENT.MULTI_STATEMENTS)

n = 10000
print("Populating %s uniform locations around the globe:"%n)
try:
    with connection.cursor() as cursor:
        for i in tqdm(range(n)):
            cursor.execute(
                Path('./populate_sqls/uniform.sql').read_text(),
                ("POINT(%s %s)" % (uniform(-90, 90), uniform(-180,180)))
            )

        connection.commit()

finally:
    connection.close()