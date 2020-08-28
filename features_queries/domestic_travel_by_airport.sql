-- Finds the proportion of travel is domestic for a given country.
-- Calculated by taking the proportion of outbound routes have a 
-- destination within the country.

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