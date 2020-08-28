-- Calculates the most popular destination airports for a given airport

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

