-- Selects a random airline

SELECT * 
FROM airlines
ORDER BY RAND(9)
LIMIT 10;