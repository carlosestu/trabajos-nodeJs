import express, { Express, Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { getAll, getOneById, create, updateById, deleteById, createImage } from './controllers/planets'; 
import { getAllUsers, logIn, signUp } from './controllers/users'; 
import passport from './passport';

dotenv.config();
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({storage});
const app: Express = express();
const port: number = Number(process.env.PORT ?? 3000);
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/planets', getAll)
app.get('/api/users',passport.authenticate('jwt', { session: false }), getAllUsers)
app.get('/api/planets/:id', getOneById)
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
app.post('/api/planets', create)
app.post('/api/planets/:id/image', upload.single("image"), createImage)
app.post('/api/users/login', logIn)
app.post('/api/users/signup', signUp)
app.put('/api/planets/:id', updateById)
app.delete('/api/planets/:id', deleteById)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
}); 
