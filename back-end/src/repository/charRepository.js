import { Character } from '../entitys/characterEntity';
import createError from 'http-errors';

const create = async (character, t) => {
  return Character.create(character, { transaction: t })
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
