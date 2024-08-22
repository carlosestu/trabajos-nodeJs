import express, { Express, Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { planets, getAll, getOneById, create, updateById, deleteById } from './controllers/planets'; 
dotenv.config();
const app: Express = express();
const port: number = Number(process.env.PORT ?? 3000);
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/planets', getAll)
app.get('/api/planets/:id', getOneById)
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
app.post('/api/planets', create)
app.put('/api/planets/:id', updateById)
app.delete('/api/planets/:id', deleteById)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
}); 
