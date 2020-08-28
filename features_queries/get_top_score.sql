-- get highscore for a game

SELECT uid,score
FROM scores
WHERE id not in (
    SELECT s1.id FROM scores as s1
    JOIN scores as s2
    WHERE s1.game_id = 1 and s2.game_id = 1 
    AND s1.id < s2.id
)

