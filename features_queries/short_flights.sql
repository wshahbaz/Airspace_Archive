-- selects all the routes within a where source and destination 
-- are shorter than a given distancen for this example, range is 100km

SELECT r.id, s.name, d.name
FROM routes as r
INNER JOIN airports as s
ON source = s.iata 
INNER JOIN airports as d
ON destination = d.iata 
WHERE ST_Distance_Sphere(s.position,d.position, 4326) < 100000
ORDER by r.id 
LIMIT 10;
