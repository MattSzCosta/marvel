import createError from "http-errors";
import repositoy from "../repository/userRepository"
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

export default {
    createUser,
    updateUser,
    hasUserByEmail,
    me
}