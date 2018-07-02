
CREATE TABLE public.tags (
                tag_id INTEGER NOT NULL,
                tag_des VARCHAR(30) NOT NULL,
                CONSTRAINT tags_pk PRIMARY KEY (tag_id)
);


CREATE TABLE public.type_user (
                type_id INTEGER NOT NULL,
                type_des VARCHAR(30) NOT NULL,
                CONSTRAINT type_user_pk PRIMARY KEY (type_id)
);


CREATE SEQUENCE public.app_user_user_id_seq;

CREATE TABLE public.app_user (
                user_id INTEGER NOT NULL DEFAULT nextval('public.app_user_user_id_seq'),
                fullname VARCHAR(60) NOT NULL,
                username VARCHAR(30) NOT NULL,
                password VARCHAR(32) NOT NULL,
                email VARCHAR(60) NOT NULL,
                type_id INTEGER DEFAULT 1 NOT NULL,
                bio VARCHAR(400) NOT NULL,
                profile_pic VARCHAR(300) NOT NULL,
                CONSTRAINT app_user_pk PRIMARY KEY (user_id)
);


ALTER SEQUENCE public.app_user_user_id_seq OWNED BY public.app_user.user_id;

CREATE SEQUENCE public.comments_comment_id_seq_1;

CREATE TABLE public.comments (
                comment_id INTEGER NOT NULL DEFAULT nextval('public.comments_comment_id_seq_1'),
                comment_text VARCHAR(250) NOT NULL,
                created_at TIMESTAMP NOT NULL,
                user_id INTEGER NOT NULL,
                CONSTRAINT comments_pk PRIMARY KEY (comment_id)
);


ALTER SEQUENCE public.comments_comment_id_seq_1 OWNED BY public.comments.comment_id;

CREATE SEQUENCE public.media_media_id_seq;

CREATE TABLE public.media (
                media_id INTEGER NOT NULL DEFAULT nextval('public.media_media_id_seq'),
                media_text VARCHAR(300) NOT NULL,
                media_url VARCHAR(300) NOT NULL,
                media_filename VARCHAR(50) NOT NULL,
                created_at TIMESTAMP NOT NULL,
                user_id INTEGER NOT NULL,
                comment_id INTEGER NOT NULL,
                CONSTRAINT media_pk PRIMARY KEY (media_id)
);


ALTER SEQUENCE public.media_media_id_seq OWNED BY public.media.media_id;

CREATE TABLE public.media_tags (
                media_id INTEGER NOT NULL,
                tag_id INTEGER NOT NULL,
                CONSTRAINT media_tags_pk PRIMARY KEY (media_id, tag_id)
);


CREATE TABLE public.likes (
                user_id INTEGER NOT NULL,
                media_id INTEGER NOT NULL,
                state BOOLEAN NOT NULL,
                CONSTRAINT likes_pk PRIMARY KEY (user_id, media_id)
);


ALTER TABLE public.media_tags ADD CONSTRAINT tags_posts_tags_fk
FOREIGN KEY (tag_id)
REFERENCES public.tags (tag_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.app_user ADD CONSTRAINT type_user_app_user_fk
FOREIGN KEY (type_id)
REFERENCES public.type_user (type_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.media ADD CONSTRAINT app_user_posts_fk
FOREIGN KEY (user_id)
REFERENCES public.app_user (user_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.comments ADD CONSTRAINT app_user_comments_fk
FOREIGN KEY (user_id)
REFERENCES public.app_user (user_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.likes ADD CONSTRAINT app_user_likes_fk
FOREIGN KEY (user_id)
REFERENCES public.app_user (user_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.media ADD CONSTRAINT comments_posts_fk
FOREIGN KEY (comment_id)
REFERENCES public.comments (comment_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.likes ADD CONSTRAINT posts_likes_fk
FOREIGN KEY (media_id)
REFERENCES public.media (media_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.media_tags ADD CONSTRAINT posts_posts_tags_fk
FOREIGN KEY (media_id)
REFERENCES public.media (media_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;
