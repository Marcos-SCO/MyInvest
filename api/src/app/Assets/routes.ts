import { Router } from "express";
import AssetsController from "./controllers/AssetsController";

const routes = Router();

routes.post('/assets/stocks/', AssetsController().create);



export default routes;