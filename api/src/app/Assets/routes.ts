import { Router } from "express";
import AssetsController from "./controllers/AssetsController";

const routes = Router();

routes.post('/assets/stocks/', AssetsController().create);
routes.put('/assets/stocks/', AssetsController().update);



export default routes;