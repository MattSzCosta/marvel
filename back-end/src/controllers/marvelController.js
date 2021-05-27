import marvelService from '../service/marvelService';

const getAllComics = async (req, res, next) => {
  try {
    const { search = '', limit = 12, offset = 0 } = req.query;
    const response = await marvelService.getAllComics({ search, limit, offset });
    res.status(200).json(response.data);
  } catch (error) {
    next(error);
  }
};

const getComicById = async (req, res, next) => {
  try {
    const { id } = req.query;
    const response = await marvelService.getComicById({ id });
    res.status(200).json(response.data);
  } catch (error) {
    next(error);
  }
};

const getAllChar = async (req, res, next) => {
  try {
    const { search = '', limit = 12, offset = 0 } = req.query;
    const response = await marvelService.getAllChar({ search, limit, offset });
    res.status(200).json(response.data);
  } catch (error) {
    next(error);
  }
};

const getCharById = async (req, res, next) => {
  try {
    const { id } = req.query;
    console.log(id);
    console.log('============');
    const response = await marvelService.getCharById({ id });
    res.status(200).json(response.data);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllComics,
  getAllChar,
  getComicById,
  getCharById,
};
