-- Returns aircraft models and route destinations and the number of each pair

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