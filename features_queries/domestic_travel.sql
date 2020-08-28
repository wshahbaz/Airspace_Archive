-- Finds the proportion of travel is domestic for a given country.
-- Calculated by taking the proportion of outbound routes have a 
-- destination within the country.

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