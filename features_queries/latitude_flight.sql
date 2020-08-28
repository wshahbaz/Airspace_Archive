
-- Selects all the routes going to cities in the given latitude range
SELECT * 
FROM routes
WHERE destination in
(
    SELECT iata 
    FROM airports
    WHERE ST_Y(position) > -10 and ST_Y(position) < 10
)
LIMIT 10;