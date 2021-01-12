INSERT INTO `airports` (
    `id`,
    `type`,
    `name`,
    `position`,
    `altitude`,
    `continent`,
    `iso_country`,
    `iso_region`,
    `city`,
    `scheduled_service`,
    `iata`,
    `wikipedia_link`
)
VALUES (%s, %s, %s, ST_GeomFromText(%s, 4326), %s, %s, %s, %s, %s, %s, %s, %s);