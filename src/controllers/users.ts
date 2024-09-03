import { db } from "../db"
import express, { Express, Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken"
import * as dotenv from 'dotenv';
import { string } from "joi";
dotenv.config();

export const getAllUsers = async(req: Request, res: Response) => {
    const users = await db.many(`SELECT * FROM users`);
      res.status(200).json(users);
    };
  export const logIn = async(req: Request, res: Response) => {
    const {username, password} = req.body;
    const user = await db.oneOrNone(`SELECT * FROM users WHERE username=$1`, username);
      if (user && user.password === password) {
         const {SECRET} = process.env;
         if (!SECRET) {
          throw new Error('JWT SECRET is not defined in environment variables');
        }
         const payload = {
          id: user.id,
          username,
         }
        const token = jwt.sign(payload, SECRET);
        await db.none(`UPDATE users SET token=$2 WHERE id=$1`, [user.id, token]);
        res.status(200).json({msg:"login completado", token: token});
      } else {
        res.status(400).json({msg:"credenciales incorrectas"})
      }
    };
    export const signUp = async(req: Request, res: Response) => {
      const {username, password} = req.body;
      const user = await db.oneOrNone(`SELECT * FROM users WHERE username=$1`, username);
      if (user) {
        res.status(400).json({msg:"el usuario ya existe en la base de datos"});
      } else {
        const {SECRET} = process.env;
        if (!SECRET) {
         throw new Error('JWT SECRET is not defined in environment variables');
       }
       const newUser = await db.one(`INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id`, [username, password]);
        const payload = {
          id: newUser.id,
          username,
         }
        const token = jwt.sign(payload, SECRET);
        await db.none(`UPDATE users SET token=$2 WHERE id=$1`, [newUser.id, token])
        res.status(200).json({msg:"registro completado", token: token});
      }
    }