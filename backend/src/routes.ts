import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';
import RestsController from './controllers/RestsControllers';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/rests', RestsController.index);
routes.get('/rests/:id', RestsController.show);
routes.post('/rests', upload.array('images'), RestsController.create);

export default routes;