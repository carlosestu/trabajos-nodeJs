import express, { Express, Request, Response, NextFunction } from 'express';
import Joi, { object } from 'joi';
import { db } from '../db';
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
  export const createImage = async (req: Request, res: Response) => {
    const {id} = req.params;
    const filename = req.file?.filename;
    if (filename) {
      await db.none('UPDATE planets SET image=$2 WHERE id=$1', [id, filename]);
      res.status(200).json({msg: "the planet image was updated"})
    } else {
      res.status(400).json({msg: "the planet image couldnt load"})
    }
  }
