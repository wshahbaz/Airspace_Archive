INSERT INTO `country_boundaries` (
    `ISO_A2`,
    `boundary`
)
VALUES (%s, ST_GeomFromGeoJSON(%s));