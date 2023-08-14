import { Router } from "express";

import authMiddleware from "@app/Users/middlewares/AuthMiddleware";

import UserController from "@app/Users/controllers/UserController";

const routes = Router();

routes.post('/users/', UserController().create);

routes.get('/users/:page(\\d+)?/:numberOfItens(\\d+)?', authMiddleware, UserController().index);

routes.get('/user/:id(\\d+)', authMiddleware, UserController().getOne);

routes.put('/user/', authMiddleware, UserController().edit);



export default routes;