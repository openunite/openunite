CREATE TABLE openunite.users (
    id                                          bigserial PRIMARY KEY NOT NULL,
    email                                       varchar(255) NOT NULL UNIQUE,
    password                                    varchar(255) NOT NULL,
    password_salt                               varchar(255) NOT NULL,
    role                                        varchar(255) NOT NULL,
    created_at                                  timestamptz DEFAULT now(),
    profile_name                                varchar(255) NOT NULL,
    profile_gender                              varchar(255) NULL,
    profile_location                            varchar(255) NULL,
    profile_picture_url                         varchar(255) NULL,
    profile_bio                                 text NULL
);

CREATE INDEX users_email_idx ON openunite.users(email);
