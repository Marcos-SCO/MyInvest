import { Router } from "express";

import AuthController from "@app/Auth/controllers/AuthController";

const routes = Router();

// routes.post('/auth/sign-in', auth().create);
routes.post('/auth/sign-in', AuthController().create);


export default routes;