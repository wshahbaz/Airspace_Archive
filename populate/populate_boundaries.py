"""
Submit SQL Queries using Google Cloud SQL Proxy

Populate Relations of Database From CSV
"""
import json
import geojson
import pymysql
import pycountry
from tqdm import tqdm
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

features = geojson.loads(Path('../data/countries.geojson').read_text())['features']

codes = [
    pycountry.countries.get(alpha_3=feature['properties']['ISO_A3'])
    for feature in features
]

codes = [code.alpha_2 if code is not None else "ZZZ" for code in codes]

geometries = [
    geojson.dumps(feature['geometry'])
    for feature in features
]

country_boundaries = list(filter(lambda x: x[0] != 'ZZZ', zip(codes, geometries)))

print("Populating Country Boundaries:")
try:
    with connection.cursor() as cursor:
        for entry in tqdm(country_boundaries):
            cursor.execute(Path('./populate_sqls/country_boundaries.sql').read_text(), entry)

        connection.commit()

finally:
    connection.close()