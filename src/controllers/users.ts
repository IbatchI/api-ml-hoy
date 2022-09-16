import { Request, Response } from "express";
import bcrypt from 'bcrypt'

import User from "../models/user";

export const usersGet = (req: Request, res: Response) => {
    res.json({
        msg: 'get API - controlador'
    });
}

export const usersPost = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body
    const user = new User({ name, email, password, role })
    
    // Encrypt password
    const salt = bcrypt.genSaltSync()
    user.password = bcrypt.hashSync(password, salt)

    // Save user in DB
    await user.save()

    res.json({ 
        message: 'Usuario creado',
        user 
    });
}

export const userPut = async (req: Request, res: Response) => {
    const { id } = req.params
    const { _id, password, google, email, ...rest } = req.body
    if(password) {
        // Encrypt password
        const salt = bcrypt.genSaltSync()
        rest.password = bcrypt.hashSync(password, salt)
    }

    const user = await User.findByIdAndUpdate(id, rest)

    res.json({ 
        message: 'Usuario actualizado',
        user 
    });
}

export const userDelete = async (req: Request, res: Response) => {
    const { id } = req.params
    const user = await User.findByIdAndUpdate(id, { state: false })

    res.json({ 
        message: 'Usuario eliminado',
        user 
    });
}