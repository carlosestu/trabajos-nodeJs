import { db } from "../db"
import express, { Express, Request, Response, NextFunction } from 'express';

export const getAllUsers = async(req: Request, res: Response) => {
    const users = await db.many(`SELECT * FROM users`);
      res.status(200).json(users);
    };
  export const logIn = async(req: Request, res: Response) => {
    const {username, password} = req.body;
    const user = await db.one(`SELECT * FROM users WHERE username=$1`, username);
      if (user && user.password === password) {
        const token =
        res.status(200).json({msg:"login completado"});
      } else {
        res.status(400).json({msg:"credenciales incorrectas"})
      }
    };