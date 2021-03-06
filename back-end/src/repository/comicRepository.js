import { Comic } from '../entitys/comicEntity';
import createError from 'http-errors';

const create = async (comic) =>
  Comic.create(comic)
    .then((res) => res)
    .catch((err) => {
      throw createError(500, err);
    });

const findOne = ({ apiId }) => {
  const attributes = ['id', 'apiId'];
  return Comic.findOne({ attributes, where: { apiId } });
};

export default {
  create,
  findOne,
};
