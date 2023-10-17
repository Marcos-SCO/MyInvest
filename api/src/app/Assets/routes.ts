import { Router } from "express";
import AssetsController from "./controllers/AssetsController";
import UserAssetsController from "./controllers/UserAssetsController";

const routes = Router();

routes.post('/assets/stocks/', AssetsController().create);
routes.put('/assets/stocks/', AssetsController().update);

routes.post('/assets/user/', UserAssetsController().create);
routes.delete('/assets/user/', UserAssetsController().destroy);

routes.post('/assets/user/paginate', UserAssetsController().index);

export default routes;