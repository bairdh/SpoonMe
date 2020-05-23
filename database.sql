
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

Database name: recipe_app

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "users_recipes"(
    "id" SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    recipe_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "user"(id),
    FOREIGN KEY (recipe_id) REFERENCES recipe(id)
);

CREATE TABLE recipe(
    id SERIAL PRIMARY KEY,
    name VARCHAR(80) NOT NULL,
    image VARCHAR(1000),
    notes VARCHAR(500)
);

CREATE TABLE ingredient(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    amount INT,
    measurement VARCHAR(20),
    recipe_id INT NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES recipe(id)
);

CREATE TABLE direction(
    id SERIAL PRIMARY KEY,
    step int NOT NULL,
    direction VARCHAR(1000),
    recipe_id INT NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES recipe(id)
);