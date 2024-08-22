import express, { Express, Request, Response, NextFunction } from 'express';
export interface Planet {
    id: number;
    name: string;
  }
  export type Planets = Planet[];
  
  export let planets: Planets = [
    {
      id: 1,
      name: "Mercurio",
    },
    {
      id: 2,
      name: "Venus",
    },
    {
      id: 3,
      name: "Tierra",
    },
    {
      id: 4,
      name: "Marte",
    },
    {
      id: 5,
      name: "Júpiter",
    },
    {
      id: 6,
      name: "Saturno",
    },
    {
      id: 7,
      name: "Urano",
    },
    {
      id: 8,
      name: "Neptuno",
    }
  ];
  let planetas = [...planets];
 export const getAll = (req: Request, res: Response): void => {
    res.status(200).json(planetas);
  };
 export const getOneById = (req: Request, res: Response): void => {
    const {id} = req.params;
    const planet = planets.find((p) => p.id === Number(id));
    res.status(200).json(planet);
  };
 export const create = (req: Request, res: Response): void => {
    const {id, name} = req.body;
    const newPlanet = {id, name};
   planetas = [...planetas, newPlanet];
   res.status(201).json({msg: "the planet was created", planets: planetas});
  };
 export const updateById = (req: Request, res: Response): void => {
    const {id} = req.params;
    const {name} = req.body;
    planetas = planetas.map((p) => p.id === Number(id) ? {...p, name} : p);
    console.log(planetas);
    res.status(200).json({msg: "the planet was updated", planets: planetas})
  };
  export const deleteById = (req: Request, res: Response): void => {
    const {id} = req.params;
    planetas = planetas.filter((p) => p.id !== Number(id));
    console.log(planetas);
    res.status(200).json({msg: "the planet was deleted", planets: planetas})
  };
