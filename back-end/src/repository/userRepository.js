import {User} from "../entitys/userEntity";
import createError from "http-errors";

const createUser = async (user, t) => {
    return User.create(user, { transaction: t })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            throw createError(500, err);
    });
};

const updateUser = async (user, t) => {
    const { password, firstName, lastName, email, id } = user
    return User.update({ password, firstName, lastName, email },
        {where: { id }}
        , { transaction: t })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            throw createError(500, err);
    });
};

const countUser = (params) => {
    return User.count({ where: {...params}})
}

const profile = ({ id }) => {
    return User.findOne({ where : { id }})
}

const authenticate = async({ email, password}) => {
   return User.findOne({ where: {email, password}})
   .then(res => res)
   .catch((err) => {
        throw createError(500, err);
    });
}


const addComic = ({ comicId, userId }) => {
    return User.addComic(userId, comicId)
}

export default {
    createUser,
    updateUser,
    countUser,
    profile,
    authenticate,
    addComic
}