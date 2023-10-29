import { Router } from "express";
import AssetsController from "./controllers/AssetsController";
import UserAssetsController from "./controllers/UserAssetsController";
import UserAssetsService from "./services/UserAssetService";

const routes = Router();

routes.get('/assetsApiQuery/:ticker([\\s\\S]+)', AssetsController().searchAssetsApiQuery);

routes.get('/assets/acoes/:ticker([\\s\\S]+)', AssetsController().show);
routes.get('/assets/stocks/:ticker([\\s\\S]+)', AssetsController().show);
routes.get('/assets/fiis/:ticker([\\s\\S]+)', AssetsController().show);

routes.post('/assets/', AssetsController().create);
routes.put('/assets/', AssetsController().update);
routes.delete('/assets/', AssetsController().destroy);

routes.post('/verify/user/asset/', UserAssetsService().verifyIfUserHasAsset);
routes.post('/assets/user/', UserAssetsController().create);
routes.delete('/assets/user/', UserAssetsController().destroy);

routes.post('/assets/user/paginate/', UserAssetsController().index);

export default routes;