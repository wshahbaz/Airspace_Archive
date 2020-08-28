-- Gets the average distance to nearest important if dropped in random location
-- for each country

SELECT c.name as country, AVG(b.dist) as avg_dist
FROM (
    SELECT b.ISO_A2 as cid, MIN(ST_Distance_Sphere(p.position, a.position, 4326)) as dist
    FROM uniform as p 
    JOIN (
        SELECT position,iso_country FROM airports as a
        WHERE ST_X(a.position) < 180 and ST_X(a.position) > -180 and ST_Y(a.position) < 90 and ST_Y(a.position) > -90
        and iso_country = 'CA'
    ) as a
    JOIN (
        SELECT * FROM country_boundaries
        WHERE ISO_A2 = 'CA'
    ) as b
    WHERE MBRContains(b.boundary,p.position) and a.iso_country = b.ISO_A2
    GROUP BY b.ISO_A2, p.position
) as b
JOIN countries as c
ON c.ISO_A2 = b.cid 
GROUP BY c.name;