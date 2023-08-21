import { Router } from "express";

import AuthController from "@app/Auth/controllers/AuthController";

import authMiddleware from '@app/Users/middlewares/AuthMiddleware';

const routes = Router();

// routes.post('/auth/sign-in', auth().create);
routes.post('/auth/sign-in', AuthController().create);

routes.delete('/auth/sign-out', authMiddleware, AuthController().destroy);


export default routes;