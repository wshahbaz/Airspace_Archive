-- Selects a random airport

SELECT * 
FROM airports
ORDER BY RAND(9)
LIMIT 10;