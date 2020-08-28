-- Selects all the routes going to the least visited airport

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