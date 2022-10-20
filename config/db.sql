CREATE TABLE roles
(
    id              serial PRIMARY KEY,
    name       		varchar NOT NULL,
    status          boolean NULL DEFAULT true,
    createdat       TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updatedat       TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users
(
    id              serial PRIMARY KEY,
    rolid        	int REFERENCES roles (id),
    firstname       varchar NOT NULL,
    lastname        varchar NOT NULL,
    email           varchar NOT NULL,
    username        varchar NOT NULL,
    password        varchar NOT NULL,
    accesstoken     varchar NOT NULL,
    refreshtoken    varchar NOT NULL,
    status          boolean NULL DEFAULT true,
    createdat       TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updatedat       TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO public.roles
(name)
VALUES('Administrator');

INSERT INTO public.users
(rolid, firstname, lastname, email, username, "password", accesstoken, refreshtoken, status)
VALUES(1, 'John', 'Doe', 'john.dow@gmail.com', 'jdoe', '12345', '', '', true);