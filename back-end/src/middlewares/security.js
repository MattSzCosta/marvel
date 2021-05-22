import { isNil, not, pipe, replace, when } from "ramda";
import { verifyToken } from "../service/authService";

const authorization = when(pipe(isNil, not), replace(/^Bearer\s/, ""));
const verify = when(pipe(isNil, not), verifyToken);

export const security = async (request, response, next) => {
  try {
    request.user = await verify(authorization(request.headers.authorization));
  } catch (e) {
    return next(e);
  }
  next();
};
