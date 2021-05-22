import { isNil, not, pipe, replace, when } from "ramda";
import service from "../service/authService";
import createError from "http-errors";

const authorization = when(pipe(isNil, not), replace(/^Bearer\s/, ""));

export const security = async (request, response, next) => {
  try {
    const token = authorization(request.headers.authorization)
    if(!token) {
      throw createError(401);
    }
    request.user = await service.verifyToken(token);
    next()
  } catch (e) {
    return next(e);
  }
};
