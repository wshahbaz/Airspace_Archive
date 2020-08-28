-- For a given aircraft model, returns which airlines fly those type of aircrafts the most

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