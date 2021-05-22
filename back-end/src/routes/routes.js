import { Router } from 'express';
import * as validator from "../validation/validator"
import userValidation from "../validation/userValidation"
import authValidation from "../validation/authValidation"
const handle = require("express-async-handler");
// Controllers imports
import userController from '../controllers/userController';
import authController from '../controllers/authController';
import marvelController from '../controllers/marvelController';
// Middleware imports
import { security } from "../middlewares/security";

const router = Router();
// User routes
router.post('/user/me', async (req, res, next) => {
    await validator.validate(userValidation.userCreateValidator, req.body, res, next);
  },
  userController.create
);

router.put('/user/me', 
    security,
    (req, res, next) => (
    validator.validate(userValidation.userCreateValidator, req.body, res, next)
    ),
    userController.updateUser
);

router.get('/user/me', userController.me);

// Auth routes
router.post('/login',(req, res, next) => (
  validator.validate(authValidation.login, req.body, res, next)
  ),
  authController.login);

router.post('/user/like', security,(req, res, next) => (
  validator.validate(userValidation.userLikeValidator, req.body, res, next)
  ),
   userController.likeCharComic);

router.get('/user/like', security, userController.content);

// Char
router.get(
  '/chars',
  security,
  marvelController.getAllChar,
);

router.get('/char', security, marvelController.getCharById);

// Comics
router.get(
  '/comics',
  security,
  marvelController.getAllComics,
);

router.get('/comic', security, marvelController.getComicById);
export default router;
