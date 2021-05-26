import createHttpError from 'http-errors';
import { UserComics } from '../entitys/userComicEntity';

const findOne = ({ comicId, userId }) => {
  const attributes = ['id'];
  return UserComics.findOne({ attributes, where: { comicId, userId } });
};

const deleteById = async (id, t) => {
  return UserComics.destroy({ where: { id }, transaction: t })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw createHttpError(500, err);
    });
};

export default {
  findOne,
  deleteById,
};
