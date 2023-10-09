import { Router } from "express";

import authRoutes from '@app/Auth/routes';
import userRoutes from '@app/Users/routes';
import assetRoutes from '@app/Assets/routes';

const routes = Router();

routes.use(authRoutes);
routes.use(userRoutes);
routes.use(assetRoutes);

export default routes;