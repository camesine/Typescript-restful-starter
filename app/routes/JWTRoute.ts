import * as express from 'express'
import { JWTController } from '../controllers/JWTController'

export const JWTRoute: express.Router = express.Router()
.post('/', JWTController.Index)
