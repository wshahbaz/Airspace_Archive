"""
Submit SQL Queries using Google Cloud SQL Proxy

Populate Relations of Database From CSV
"""
import json
import pymysql
import pandas as pd
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

# mapping functions

def airlines(row) -> tuple:
    return (
        row['Airline ID'],
        row['Name'],
        row['Alias'],
        row['Country'],
        row['Active'] == 'Y'
    )

def airplanes(row) -> tuple:
    return (
        row['Name'],
        row["IATA code"],
        row["ICAO code"]
    )

def airports(row) -> tuple:
    return (
        row['id'],
        row['type'],
        row['name'],
        "POINT(%s %s)" % (row['latitude_deg'], row['longitude_deg']),
        row['elevation_ft'],
        row['continent'],
        row['iso_country'],
        row['iso_region'],
        row['municipality'],
        row['scheduled_service'] != 'no',
        row['iata_code'],
        row['wikipedia_link']
    )

def countries(row) -> tuple:
    return (
        row['code'] if row['code'] is not None else "",
        row['name'],
        row['continent'],
        row['wikipedia_link']
    )

def routes(row) -> tuple:
    return (
        None if row['Airline ID'] == '\\N' else row['Airline ID'],
        row['Source airport'],
        row['Destination airport'],
        row['Equipment'][:3] if row['Equipment'] is not None else ""
    )

mapping_functions = [
    #airlines,
    #airplanes,
    #airports,
    #countries,
    routes
]

tables = [
    #'airlines',
    #'airplanes',
    #'all_airports',
    #'countries',
    'routes'
]

populate_sqls = [Path('./populate_sqls/' + table + '.sql') for table in tables]
populate_csvs = [Path('../data/' + table + '.csv') for table in tables]

try:
    for sql_path, csv_path, mapping in zip(populate_sqls, populate_csvs, mapping_functions):
        print("Populating: " + sql_path.stem)
        SQL = sql_path.read_text()
        DF = pd.read_csv(csv_path)
        DF = DF.where((pd.notnull(DF)), None)
        total = len(DF.index)

        with tqdm(total=total) as pbar:
            with connection.cursor() as cursor:
                for idx, row in DF.iterrows():
                    cursor.execute(SQL, mapping(row))
                    pbar.update(1)

            connection.commit()

finally:
    connection.close()