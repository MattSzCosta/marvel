import userService from "../service/userService"
import createError from "http-errors";
import { authorization } from "../middlewares/security"

const create = async( req,res,next ) => {
    try {
        const hasEmail = await userService.hasUserByEmail(req.body)
        if(hasEmail){
            throw createError(400, "Email alredy exist")
        }
        return userService.createUser(req.body)
        .then(() => res.status(201).json())
    } catch(error) {
        next(error)
    }
}

const updateUser = async( req,res,next ) => {
    try {
        const hasEmail = await userService.hasUserByEmail(req.body)
        if(!hasEmail){
            throw createError(400, 'User not found');
        }
        userService.updateUser(req.body).then(() => res.status(204).json())
    } catch(error) {
        next(error)
    }
}

const me = async( req,res,next ) => {
    try {
        const user = await userService.me(req.userId)
        return res.status(200).json({
            user
        })
    } catch(error) {
        next(error)
    }
}

const likeCharComic = async( req,res,next ) => {
    try {
        await userService.likeCharComic(req.body, req.user.sub)
        return res.status(204).json()
    } catch(error) {
        next(error)
    }
}

export default {
    create,
    updateUser,
    me,
    likeCharComic
}