import http from "../config/http"

const DEFAULT = {
    ts:process.env.MARVEL_TIMESTAMP,
    apikey:process.env.MARVEL_PUBLIC,
    hash:process.env.MARVEL_HASH,
}

const getAllComics = async ({search= "", limit = "", offset = ""}) => {
    return new Promise((resolve, reject) => {
        const params = {
            ...DEFAULT,
            limit:limit,
            offset:offset,
        }
        if(search)
            params['titleStartsWith'] = search
		return http
			.get("/public/comics", {params})
			.then((res) => resolve(res))
			.catch((err) =>reject(err));
	});
}

const getAllChar = async ({search= "", limit = "", offset = ""}) => {
    return new Promise((resolve, reject) => {
        const params = {
            ...DEFAULT,
            limit:limit,
            offset:offset
        }
        if(search)
            params['nameStartsWith'] = search
		return http
			.get("/public/characters", {params})
			.then((res) => resolve(res))
			.catch((err) =>{console.log(err); reject(err)});
	});
}

const getComicById = async ({id}) => {
    return new Promise((resolve, reject) => {
        const params = {
            ...DEFAULT,
            id
        }
		return http
			.get("/public/comics", {params})
			.then((res) => resolve(res))
			.catch((err) => reject(err));
	});
}


const getCharById = async ({id}) => {
    return new Promise((resolve, reject) => {
        const params = {
            ...DEFAULT,
            id
        }
		return http
			.get("/public/characters", {params})
			.then((res) => resolve(res))
			.catch((err) => reject(err));
	});
}

export default { getAllChar, getAllComics, getComicById, getCharById }