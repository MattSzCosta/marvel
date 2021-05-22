import { Router } from 'express';
import * as validator from "../validation/validator"
import userValidation from "../validation/userValidation"
import authValidation from "../validation/authValidation"
const handle = require("express-async-handler");
// Controllers imports
import userController from '../controllers/userController';
import authController from '../controllers/authController';
// import marvelController from './controllers/marvel-controller';
// Middleware imports
import verifyHandle from '../middlewares/verify-token-handler';
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

// router.post('/like/charOrComic', verifyHandle, userController.likeCharComic);
// router.get('/like/byUser', verifyHandle, userController.likeByUser);

// // Char protected routes
// router.get(
//   '/char/index/:limit/:offset',
//   verifyHandle,
//   marvelController.indexChar,
// );

// router.get('/char/index/:id', verifyHandle, marvelController.indexCharById);

// // Comics protected routes
// router.get(
//   '/comics/index/:limit/:offset',
//   verifyHandle,
//   marvelController.indexComics,
// );

// router.get('/comics/index/:id', verifyHandle, marvelController.indexComicsById);
export default router;
