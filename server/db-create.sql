CREATE TABLE tournament (
id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
create_date TIMESTAMP,
finished boolean
)


CREATE TABLE pilot (
id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
tournament_id INT(11)
)


CREATE TABLE mistake (
id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
tournament_id INT(11),
race_index INT(11),
pilot_id INT(11),
mistake_type_id INT(11)
)



CREATE TABLE mistake_type (
id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
points INT(3)
)

ALTER TABLE pilot ADD COLUMN `last_race_index` int(11);

#not nice, should be a way to remap somehow and keep naming convention both sides
ALTER TABLE pilot CHANGE `last_race_index` `lastRaceIndex` int(11);
