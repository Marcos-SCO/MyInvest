import { Router } from "express";
import AssetsController from "./controllers/AssetsController";
import UserAssetsController from "./controllers/UserAssetsController";
import UserAssetsService from "./services/UserAssetService";

import PriceAssetsWatchController from './controllers/PriceAssetsWatchController';
import TopAssetsController from "./controllers/TopAssetsController";

const routes = Router();

routes.get('/assetsApiQuery/:ticker([\\s\\S]+)', AssetsController().searchAssetsApiQuery);

routes.get('/assets/acoes/:ticker([\\s\\S]+)', AssetsController().show);
routes.get('/assets/stocks/:ticker([\\s\\S]+)', AssetsController().show);
routes.get('/assets/fiis/:ticker([\\s\\S]+)', AssetsController().show);

routes.post('/assets/paginate/', AssetsController().index);
routes.post('/assets/', AssetsController().create);
routes.put('/assets/', AssetsController().update);
routes.delete('/assets/', AssetsController().destroy);

routes.post('/verify/user/asset/', UserAssetsService().verifyIfUserHasAsset);
routes.post('/assets/user/', UserAssetsController().create);
routes.delete('/assets/user/', UserAssetsController().destroy);

routes.post('/assets/price/watch/', PriceAssetsWatchController().create);
routes.delete('/assets/price/watch/', PriceAssetsWatchController().destroy);
routes.post('/assets/price/watch/paginate/', PriceAssetsWatchController().index);

routes.post('/assets/user/view/', PriceAssetsWatchController().show);

routes.post('/assets/user/paginate/', UserAssetsController().index);

routes.post('/topAssets/', TopAssetsController().index);

export default routes;