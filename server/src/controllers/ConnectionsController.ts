import {Request, response, Response} from "express";
import db from "../database/connection";

export class ConnectionsController {
    async create(req: Request, res: Response) {
        const {user_id} = req.body;

        await db('connections').insert({
            user_id
        })

        return res.status(201).json({
            user_id
        });
    }

    async index(req: Request, res: Response) {
        const totalConnections = await db('connections').count('* as total');

        const {total} = totalConnections[0];

        return res.json({total})
    }
}
