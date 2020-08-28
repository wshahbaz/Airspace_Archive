-- Selects a random country

SELECT * 
FROM countries
ORDER BY RAND(9)
LIMIT 10;