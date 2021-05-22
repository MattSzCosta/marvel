import authService from "../service/authService"

const login = async( req,res,next ) => {
    try {
        const token = await authService.login(req.body)
        res.status(200).json(token)
    } catch(error) {
        next(error)
    }
}

export default {
    login,
}