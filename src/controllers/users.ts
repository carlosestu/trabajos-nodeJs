import { db } from "../db"
import express, { Express, Request, Response, NextFunction } from 'express';

export const getAllUsers = async(req: Request, res: Response) => {
    const users = await db.many(`SELECT * FROM users`);
      res.status(200).json(users);
    };
