-- gets top score for a given user

SELECT uid,score
FROM scores
WHERE id not in (
    SELECT s1.id FROM scores as s1
    JOIN scores as s2
    WHERE s1.game_id = 1 and s2.game_id = 1 
    and s1.uid = 1 and s2.uid = 1
    AND s1.id < s2.id
)