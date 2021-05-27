import { User } from '../entitys/userEntity';
import createError from 'http-errors';
import { Character } from '../entitys/characterEntity';
import { Comic } from '../entitys/comicEntity';

const createUser = async (user, t) => {
  return User.create(user, { transaction: t })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw createError(500, err);
    });
};

const updateUser = async (user, id, t) => {
  const { password, firstName, lastName, email } = user;
  return User.update(
    { password, firstName, lastName, email },
    { where: { id } },
    { transaction: t }
  )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw createError(500, err);
    });
};

const countUser = (params) => {
  return User.count({ where: { ...params } });
};

const profile = ({ id }) => {
  return User.findOne({ attributes: ['firstName', 'lastName', 'email'], where: { id } });
};

const profileFull = ({ id }) => {
  return User.findOne({ where: { id } });
};

const authenticate = async ({ email, password }) => {
  return User.findOne({ where: { email, password } })
    .then((res) => res)
    .catch((err) => {
      throw createError(500, err);
    });
};

const addComic = ({ comicId, userId }) => {
  return User.addComic(userId, comicId);
};

const findLikedByUserId = (id) => {
  const att = ['id', 'apiId', 'thumb', 'name'];
  return User.findOne({
    attributes: [],
    include: [
      {
        model: Character,
        as: 'characters',
        attributes: att,
        through: {
          attributes: ['charId'],
        },
      },
      {
        model: Comic,
        as: 'comics',
        attributes: att,
        through: {
          attributes: ['comicId'],
        },
      },
    ],
    where: { id },
  });
};

export default {
  createUser,
  updateUser,
  countUser,
  profile,
  authenticate,
  addComic,
  findLikedByUserId,
  profileFull,
};
