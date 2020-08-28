-- given an x,y coordinate representing longitude and latitude, returns the closest airport
-- in this example, we use 0,0 as longitude and latitude

-- getting errors, check validity of coords

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
