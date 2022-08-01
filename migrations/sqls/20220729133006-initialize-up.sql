/* Replace with your SQL commands */
CREATE TABLE public."HttpQueries"
(
    httpQuery_id serial,
    typeOfQuery VARCHAR(255),
    PRIMARY KEY(httpQuery_id)
);
CREATE TABLE public."controllerLogs"
(
    controllerLogs_id serial,
    controllerName VARCHAR(255),
    httpQuery_id int,
    success boolean,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(controllerLogs_id),
    CONSTRAINT fk_httpQueries
        FOREIGN KEY(httpQuery_id)
            REFERENCES public."HttpQueries"(HttpQuery_id)
);