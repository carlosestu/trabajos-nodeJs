
-------------------------

import express, { Express, Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { planets } from './models/planets'; 
dotenv.config();
const app: Express = express();
const port: number = Number(process.env.PORT ?? 3000);
let planetas = [...planets]
app.use(express.json());
app.use(morgan('dev'));

app.get('/planets', (req: Request, res: Response) => {
  res.json(planetas);
});
app.get('/planets/:id', (req: Request, res: Response) => {
  const {id} = req.params;
  const planet = planets.find((p) => p.id === Number(id));
  res.json(planet);
});
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
app.post('/planets', (req: Request, res: Response) => {
  const {id, name} = req.body;
  const newPlanet = {id, name};
 planetas = [...planetas, newPlanet];
 res.status(201).json({msg: "the planet was created", planets: planetas});
});
app.put('/planets/:id', (req: Request, res: Response) => {
  const {id} = req.params;
  const {name} = req.body;
  planetas = planetas.map((p) => p.id === Number(id) ? {...p, name} : p);
  console.log(planetas);
  res.status(200).json({msg: "the planet was updated", planets: planetas})
  
});
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
}); 
