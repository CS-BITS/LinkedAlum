CREATE TABLE "posts"(
    "post_id" SERIAL PRIMARY KEY,
    "user_id" INTEGER NOT NULL,
    "message" VARCHAR(255) NOT NULL,
    "likes" INTEGER NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE "posts" ALTER COLUMN created_at SET DEFAULT now();
CREATE TABLE "comments"(
    "comment_id" SERIAL PRIMARY KEY,
    "post_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "message" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE "comments" ALTER COLUMN created_at SET DEFAULT now();
CREATE TABLE "user"(
    "user_id" SERIAL PRIMARY KEY,
    "user_name" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "email_address" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE "user" ALTER COLUMN created_at SET DEFAULT now();
ALTER TABLE
    "comments" ADD CONSTRAINT "comments_post_id_foreign" FOREIGN KEY("post_id") REFERENCES "posts"("post_id");
ALTER TABLE
    "posts" ADD CONSTRAINT "posts_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "user"("user_id");
ALTER TABLE
    "comments" ADD CONSTRAINT "comments_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "user"("user_id");