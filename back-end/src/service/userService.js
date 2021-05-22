import createError from "http-errors";
import repositoy from "../repository/userRepository"
import repositoyChar from "../repository/charRepository"
import repositoyComic from "../repository/comicRepository"
import { executeTransaction } from "../entitys";

const createUser = async(user) => {
    return executeTransaction((t) => 
        repositoy.createUser(user, t)
            .then((res) => {
                return res
            })
            .catch((err) => {
                throw createError(err.status, err.message);
            })
    );
};

const updateUser = async(user) => {
    return executeTransaction((t) => 
        repositoy.updateUser(user, t)
            .then((res) => {
                return res
            })
            .catch((err) => {
                throw createError(err.status, err.message);
            })
    );
};

const hasUserByEmail = async({ email }) => {
    return repositoy.countUser({ email })
        .then((res) => {
            return res > 0
        })
        .catch((err) => {
            throw createError(err.status, err.message);
        })
};

const me = async(id) => {
    return repositoy.profile({ id })
        .then((res) => {
            return res > 0
        })
        .catch((err) => {
            throw createError(err.status, err.message);
        })
}

const likeChar = async(content, user, t) => {
    const res = repositoyChar.findOne(content)
    if(res) {
        return user.addComic(res)
    }

    return repositoyChar.create(content, t)
           .then(createResp =>  user.addComic(createResp.id))
};

const likeComics = async(content, user, t) => {
    const res = await repositoyComic.findOne(content)
     if(res) {
         return user.addComic(res)
     }
    return repositoyComic.create(content, t)
           .then(createResp => user.addComic(createResp))
};

const likeCharComic = async({type, apiId, name, thumb}, id) => {
    const user = await repositoy.profile({id})
    return executeTransaction((t) =>{
        const content = {apiId, name, thumb}
        if (type === 'characters') {
           return likeChar(content, user, t)
        } else if (type === 'comics') {
            return likeComics(content, user, t)
        }
    })
}

export default {
    createUser,
    updateUser,
    hasUserByEmail,
    me,
    likeCharComic,
}