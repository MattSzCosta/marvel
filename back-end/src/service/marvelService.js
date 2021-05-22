import repository from "../repository/marvelRepository"
import createError from "http-errors";

const getAllChar = async({ search = "", limit = "", offset = ""}) => {
    return repository.getAllChar({search, limit, offset})
    .then(res => res.data)
    .catch(err => {throw createError(500, err.status || err.message)})
}

const getAllComics = async({ search = "", limit = "", offset = ""}) => {
    return repository.getAllComics({search, limit, offset})
    .then(res => res.data)
    .catch(err => {throw createError(500, err.status || err.message)})
}

const getComicById = async({ id }) => {
    return repository.getComicById({ id })
    .then(res => res.data)
    .catch(err => {throw createError(500, err.status || err.message)})
}

const getCharById = async({ id }) => {
    return repository.getCharById({ id })
    .then(res => res.data)
    .catch(err => {throw createError(500, err.status || err.message)})
}

export default { getAllChar, getAllComics, getComicById, getCharById }