-- Finds all the routes that pass over a certain latitude
-- route paths are assumed to be straight paths and we are flat earthers
-- we are choosing to choose 0 for the latitude (the equator)

SELECT a.*
FROM
(
    SELECT src_lat.name as src_name,dest_lat.name as dest_name,src_lat.lat as src_lat,dest_lat.lat as dest_lat,f.id
    FROM 
    routes as f 
    INNER JOIN (
        SELECT ST_Y(position) as lat, iata, name 
        FROM airports
    ) as src_lat
    ON src_lat.iata = f.source
    INNER JOIN
    (
        SELECT ST_Y(position) as lat, iata, name
        FROM airports
    ) as dest_lat
    ON dest_lat.iata = f.destination
) as a
WHERE 
(a.src_lat < 40  and a.dest_lat > 40 )
OR
(a.src_lat > 40  and a.dest_lat < 40)
LIMIT 10;


