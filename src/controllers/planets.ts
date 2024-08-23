import express, { Express, Request, Response, NextFunction } from 'express';
import Joi, { object } from 'joi';
import pgPromise = require('pg-promise');
const db = pgPromise()("postgres://postgres:postgres@localhost:5432/planets");
console.log(db);
const setupDb = async () => {
  await db.none(`
    DROP TABLE IF EXISTS planets;

    CREATE TABLE planets (
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT NOT NULL
    )
    `)
  
  await db.none(`INSERT INTO planets (name) VALUES ('Mercurio')`);
  await db.none(`INSERT INTO planets (name) VALUES ('Venus')`);
  await db.none(`INSERT INTO planets (name) VALUES ('Tierra')`);
  await db.none(`INSERT INTO planets (name) VALUES ('Marte')`);
  await db.none(`INSERT INTO planets (name) VALUES ('Júpiter')`);
  await db.none(`INSERT INTO planets (name) VALUES ('Saturno')`);
  await db.none(`INSERT INTO planets (name) VALUES ('Urano')`);
  await db.none(`INSERT INTO planets (name) VALUES ('Neptuno')`);
  }
  
    setupDb();

     const selector = (`SELECT * FROM planets`);
 export const getAll = async(req: Request, res: Response) => {
  const planets = await db.many(`SELECT * FROM planets`);
    res.status(200).json(planets);
  };
 export const getOneById = async(req: Request, res: Response) => {
    const {id} = req.params;
    const planet = await db.one(`SELECT * FROM planets WHERE id=$1;`, Number(id));
    res.status(200).json(planet);
  };
  const planetaSchema = Joi.object({
    name: Joi.string().required()
  });
  
 export const create = async (req: Request, res: Response) => {
    const {name} = req.body;
    const newPlanet = {name};
    const validatedNewPlanet = planetaSchema.validate(newPlanet);
    if (validatedNewPlanet.error) {
      return res.status(400).json({msg: validatedNewPlanet.error.details[0].message})
    } else {
      await db.none('INSERT INTO planets (name) VALUES ($1)', [name]);
      const planetas = await db.any(selector);
      res.status(201).json({msg: "the planet was created", planets: planetas});
    }
  };

 export const updateById = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {name} = req.body;
    await db.none('UPDATE planets SET name=$2 WHERE id=$1', [id, name]);
    const planetas = await db.any(selector);
    res.status(200).json({msg: "the planet was updated", planets: planetas})
  };
  export const deleteById = async (req: Request, res: Response) => {
    const {id} = req.params;
    await db.none('DELETE FROM planets WHERE id=$1', Number(id));
    const planetas = await db.any(selector);
    res.status(200).json({msg: "the planet was deleted", planets: planetas})
  };
