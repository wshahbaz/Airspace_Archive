-- gets the number of airports for a given country

SELECT COUNT(*) as num_airports
FROM airports 
WHERE iso_country = 'CA';