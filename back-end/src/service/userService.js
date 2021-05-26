import createError from 'http-errors';
import repositoy from '../repository/userRepository';
import repositoyChar from '../repository/charRepository';
import repositoyComic from '../repository/comicRepository';
import { executeTransaction } from '../entitys';
import userCharRepository from '../repository/userCharRepository';
import userComicRepository from '../repository/userComicRepository';

const createUser = async (user) => {
  return executeTransaction((t) =>
    repositoy
      .createUser(user, t)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw createError(err.status, err.message);
      })
  );
};

const updateUser = async (user) => {
  return executeTransaction((t) =>
    repositoy
      .updateUser(user, t)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw createError(err.status, err.message);
      })
  );
};

const hasUserByEmail = async ({ email }) => {
  return repositoy
    .countUser({ email })
    .then((res) => {
      return res > 0;
    })
    .catch((err) => {
      throw createError(err.status, err.message);
    });
};

const me = async (id) => {
  return repositoy
    .profile({ id })
    .then((res) => {
      return res > 0;
    })
    .catch((err) => {
      throw createError(err.status, err.message);
    });
};

const likeChar = async (char, user) => {
  const res = await repositoyChar.findOne(char);
  if (res) {
    return user.addCharacter(res);
  }
  return repositoyChar.create(char).then((createResp) => user.addCharacter(createResp));
};

const likeComics = async (comic, user) => {
  const res = await repositoyComic.findOne(comic);
  if (res) {
    return user.addComic(res);
  }
  return repositoyComic.create(comic).then((createResp) => user.addComic(createResp));
};

const validateChar = async (char, user) => {
  const userChar = await userCharRepository.findOne({ charId: char.apiId, userId: user.id });
  if (userChar?.id) {
    return userCharRepository.deleteById(userChar.id);
  } else {
    return likeChar(char, user);
  }
};

const validateComic = async (comic, user) => {
  const userComic = await userComicRepository.findOne({ comicId: comic.apiId, userId: user.id });
  if (userComic?.id) {
    return userComicRepository.deleteById(userComic.id);
  } else {
    return likeComics(comic, user);
  }
};

const likeCharComic = async ({ type, apiId, name, thumb }, id) => {
  const user = await repositoy.profile({ id });
  const data = { apiId, name, thumb };
  if (type === 'characters') {
    return validateChar(data, user);
  } else if (type === 'comics') {
    return validateComic(data, user);
  }
};

const content = async (userId) => {
  return repositoy
    .findLikedByUserId(userId)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw createError(err.status, err.message);
    });
};

export default {
  createUser,
  updateUser,
  hasUserByEmail,
  me,
  likeCharComic,
  content,
};
