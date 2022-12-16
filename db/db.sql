CREATE TABLE architect (
	architect_id SERIAL PRIMARY KEY ,
	architect_name VARCHAR NOT NULL,
	architect_email VARCHAR NOT NULL,
	architect_password VARCHAR NOT NULL
);

INSERT INTO architect (architect_name, architect_email, architect_password)
VALUES ('frifri', 'frifri@email.com', 'frifri');