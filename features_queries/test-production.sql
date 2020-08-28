
---------------------------------------------------

SELECT l.name, a.name, r.cnt
FROM (
    SELECT airline_id, airplane, count(*) as cnt
    FROM routes
    GROUP BY airline_id, airplane
    ORDER BY count(*) desc
    LIMIT 1000
) as r
INNER JOIN airplanes as a on r.airplane = a.iata
INNER JOIN airlines as l on r.airline_id = l.id
ORDER by r.cnt, l.name, a.name
LIMIT 10;

---------------------------------------------------

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
ORDER BY a.src_name, a.dest_name
LIMIT 10;

---------------------------------------------------

SELECT c.name, a.name, r.cnt
FROM (
    SELECT airplane, destination, COUNT(*) as cnt
    FROM routes
    GROUP BY airplane, destination 
    ORDER BY cnt desc 
    LIMIT 1000
) as r
INNER JOIN airplanes as a on r.airplane = a.iata
INNER JOIN airports as air on air.iata = r.destination
INNER JOIN countries as c on c.ISO_A2 = air.iso_country
ORDER by r.cnt, c.name, a.name
LIMIT 10;

---------------------------------------------------

SELECT all_routes.arpt as arpt, domestic.ct/all_routes.ct as percent_domestic
FROM (
    SELECT a1.iata as arpt, COUNT(*) as ct
    FROM routes as f 
    INNER JOIN (
        SELECT * FROM airports 
    ) as a1
    ON a1.iata = f.source
    INNER JOIN (
        SELECT * FROM airports 
    ) as a2
    ON a2.iata = f.destination
    WHERE a1.id = '3384'
    GROUP BY a1.iata
    ) as all_routes
    INNER JOIN (
        SELECT a1.iata as arpt, COUNT(*) as ct
        FROM routes as f 
        INNER JOIN (
            SELECT * FROM airports 
        ) as a1
        ON iata = f.source
        INNER JOIN (
            SELECT * FROM airports
        ) as a2
        ON a2.iata = f.destination and a2.iso_country = a1.iso_country
        WHERE a1.id = '3384'
        GROUP BY a1.iata
    ) as domestic
ON domestic.arpt = all_routes.arpt;

---------------------------------------------------

SELECT ctry.*, domestic.percent_domestic
FROM (
    SELECT * FROM countries
    WHERE ISO_A2 = 'CA'
    ) as ctry
    INNER JOIN
    (
        SELECT all_routes.ctry as ctry, domestic.ct/all_routes.ct as percent_domestic
        FROM (
            SELECT a1.iso_country as ctry, COUNT(*) as ct
            FROM routes as f 
            INNER JOIN (
                SELECT * FROM airports 
            ) as a1
            ON iata = f.source
            INNER JOIN (
                SELECT * FROM airports 
            ) as a2
            ON a2.iata = f.destination
            GROUP BY a1.iso_country
        ) as all_routes
        INNER JOIN (
            SELECT a1.iso_country as ctry, COUNT(*) as ct
            FROM routes as f 
            INNER JOIN (
                SELECT * FROM airports 
            ) as a1
            ON iata = f.source
            INNER JOIN (
                SELECT * FROM airports
            ) as a2
            ON a2.iata = f.destination and a2.iso_country = a1.iso_country
            GROUP BY a1.iso_country
        ) as domestic
    ON domestic.ctry = all_routes.ctry
) as domestic
ON ctry.ISO_A2 = domestic.ctry;

---------------------------------------------------

SELECT s.* 
FROM routes as s
INNER JOIN
(
    SELECT destination as id, COUNT(*)
    FROM routes
    GROUP BY destination
    ORDER BY COUNT(*) ASC
    LIMIT 1
) as dest
ON s.destination = dest.id;

---------------------------------------------------

SELECT a.name
FROM airports as a 
WHERE ST_X(a.position) < 180 and ST_X(a.position) > -180 and ST_Y(a.position) < 90 and ST_Y(a.position) > -90
and id not in (
    SELECT a.id
    FROM airports as a 
    JOIN airports as a2
    WHERE ST_X(a.position) < 180 and ST_X(a.position) > -180 and ST_Y(a.position) < 90 and ST_Y(a.position) > -90
    and ST_X(a2.position) < 180 and ST_X(a2.position) > -180 and ST_Y(a2.position) < 90 and ST_Y(a2.position) > -90
    and ST_Distance_Sphere(a.position, ST_GeomFromText('POINT (-77.037852 38.898556 )', 4326), 4326) > ST_Distance_Sphere(a2.position, ST_GeomFromText('POINT (-77.037852 38.898556 )', 4326), 4326)
);

---------------------------------------------------

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

---------------------------------------------------

SELECT COUNT(*) as num_airports
FROM airports 
WHERE iso_country = 'CA';

---------------------------------------------------

SELECT * 
FROM routes
WHERE destination in
(
    SELECT iata 
    FROM airports
    WHERE ST_Y(position) > -10 and ST_Y(position) < 10
)
ORDER BY id
LIMIT 10;

---------------------------------------------------

SELECT f.name as source_airport, (
    SELECT a2.name
    FROM routes as r
    INNER JOIN airports as a2 
    ON r.destination = a2.iata
    WHERE source = f.iata
    GROUP BY a2.name
    ORDER BY COUNT(*) desc
    LIMIT 1
) as most_popular_dest
FROM airports as f
WHERE id = 3384;

---------------------------------------------------


SELECT c2.name as most_popular_dest
FROM 
(
    SELECT r1.destination as dcode
    FROM routes as r1 
    INNER JOIN airports as a1 
    ON r1.source = a1.iata 
    INNER JOIN countries as c1 
    ON c1.ISO_A2 = a1.iso_country 
    WHERE c1.name = 'Canada'
) as dcodes 
INNER JOIN airports as a2
ON dcodes.dcode = a2.iata
INNER JOIN countries as c2
ON c2.ISO_A2 = a2.iso_country 
WHERE c2.name != 'Canada'
GROUP BY c2.name 
ORDER BY COUNT(*) DESC 
LIMIT 1;

---------------------------------------------------

SELECT * 
FROM airlines
ORDER BY RAND(9)
LIMIT 10;

---------------------------------------------------

SELECT * 
FROM airports
ORDER BY RAND(9)
LIMIT 10;

---------------------------------------------------

SELECT * 
FROM countries
ORDER BY RAND(9)
LIMIT 10;

---------------------------------------------------

SELECT * 
FROM scores
WHERE game_id = 1
LIMIT 10;

---------------------------------------------------

SELECT uid,score
FROM scores
WHERE id not in (
    SELECT s1.id FROM scores as s1
    JOIN scores as s2
    WHERE s1.game_id = 1 and s2.game_id = 1 
    AND s1.id < s2.id
)

---------------------------------------------------

SELECT uid,score
FROM scores
WHERE id not in (
    SELECT s1.id FROM scores as s1
    JOIN scores as s2
    WHERE s1.game_id = 1 and s2.game_id = 1 
    and s1.uid = 1 and s2.uid = 1
    AND s1.id < s2.id
)

---------------------------------------------------

INSERT INTO scores VALUES(Default, 1, 1, 10, NOW());

---------------------------------------------------

INSERT INTO users VALUES(Default, "Brad");

---------------------------------------------------