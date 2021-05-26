import { UserChar } from '../entitys/userCharEntity';
import createHttpError from 'http-errors';

const findOne = ({ charId, userId }) => {
  const attributes = ['id'];
  return UserChar.findOne({ attributes, where: { charId, userId } });
};

const deleteById = async (id, t) => {
  return UserChar.destroy({ where: { id }, transaction: t })
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
