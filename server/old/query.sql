-- grabs fraction of domestic flights data
WITH country_flights AS (
    SELECT c1.country_id as c1id, c2.country_id as c2id
    FROM 
    (
        SELECT a1.city_id as src_city_id, a2.city_id as dest_city_id
        FROM flight as f 
        JOIN airport as a1 
        ON f.source_airport_id = a1.id
        JOIN airport as a2
        ON f.dest_airport_id = a2.id
    )
    JOIN city as c1
    ON c1.id = src_city_id
    JOIN city as c2
    ON c2.id = dest_city_id
)
SELECT name, cd.count_dom / ct.count_tot as percent_domestic
FROM country
JOIN (
    SELECT COUNT(*) as count_dom, c1id
    FROM country_flights
    where c1id = c2id and c1id = country.id
    GROUP BY c1id
) as cd
on cd.c1id = country.id
JOIN (
    SELECT COUNT(*) as count_tot
    FROM country_flights
    c1id = country.id
    GROUP BY c1id
) as ct
on ct.c1id = country.id