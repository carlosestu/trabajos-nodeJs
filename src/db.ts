import pgPromise = require('pg-promise');
const db = pgPromise()("postgres://postgres:postgres@localhost:5432/planets");
console.log(db);
const setupDb = async () => {
  await db.none(`
    DROP TABLE IF EXISTS planets;

    CREATE TABLE planets (
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT
    );
    DROP TABLE IF EXISTS users;

    CREATE TABLE users (
    id SERIAL NOT NULL PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT not null,
    token TEXT
    );
    `)
  
  await db.none(`INSERT INTO planets (name) VALUES ('Mercurio')`);
  await db.none(`INSERT INTO planets (name) VALUES ('Venus')`);
  await db.none(`INSERT INTO planets (name) VALUES ('Tierra')`);
  await db.none(`INSERT INTO planets (name) VALUES ('Marte')`);
  await db.none(`INSERT INTO planets (name) VALUES ('Júpiter')`);
  await db.none(`INSERT INTO planets (name) VALUES ('Saturno')`);
  await db.none(`INSERT INTO planets (name) VALUES ('Urano')`);
  await db.none(`INSERT INTO planets (name) VALUES ('Neptuno')`);
  await db.none(`INSERT INTO users (username, password) VALUES ('prueba', 'prueba')`);
  }
  
    setupDb();
    export { db };