ALTER TABLE selwyn.events
DROP COLUMN day,
DROP COLUMN month,
DROP COLUMN year;

ALTER TABLE selwyn.events
ADD COLUMN date DATE NOT NULL;