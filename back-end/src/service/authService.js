import repository from '../repository/userRepository';
import { sign, verify, decode } from 'jsonwebtoken';
import { call, curry, isNil } from 'ramda';
import createError from 'http-errors';

const {
  TOKEN_EXPIRES_IN: tokenExpiresIn,
  TOKEN_SECRETS: tokenSecrets,
  TOKEN_ALGORITHMS: tokenAlgorithms,
} = process.env;

const options = {
  algorithm: tokenAlgorithms || 'HS256',
  expiresIn: tokenExpiresIn || '1h',
  audience: 'oauth',
};

const login = async ({ email, password }) => {
  return repository
    .authenticate({ email, password })
    .then(generateToken)
    .then(getCredential)
    .catch((err) => {
      throw createError(err.status, err.message);
    });
};

const getCredential = curry((token) => {
  return {
    access_token: token,
    token_type: 'Bearer',
    expires_in: 3600,
  };
});

const validation = (query) => {
  return async (_root, args, context) =>
    isNil(context.user)
      ? call(() => {
          throw createError(401, 'Unauthorized');
        })
      : query(args, context);
};

const generateToken = (user) => {
  return new Promise((resolve) => {
    sign(
      { firstName: user.firstName },
      tokenSecrets || 'secrets',
      {
        ...options,
        subject: user.id.toString(),
      },
      (err, token) => resolve(token)
    );
  });
};

const verifyToken = async (authorization) => {
  return new Promise((resolve, reject) => {
    verify(authorization, tokenSecrets || 'secrets', options, (error, decoded) => {
      isNil(error)
        ? resolve(decoded)
        : call(() => {
            throw createError(401, 'Unauthorized');
          });
    });
  });
};

export default { generateToken, login, validation, verifyToken };
