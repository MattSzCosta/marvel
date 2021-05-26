import { Character } from '../entitys/characterEntity';
import createError from 'http-errors';

const create = async (character) => {
  return Character.create(character)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw createError(500, err);
    });
};

const findOne = ({ apiId }) => {
  const attributes = ['id', 'apiId'];
  return Character.findOne({ attributes, where: { apiId } });
};

export default {
  create,
  findOne,
};
