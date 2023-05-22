import express from 'express'
import {fomularioLogin, fomularioRegistro} from '../controllers/usuarioController.js'

const router = express.Router();

router.get('/login', fomularioLogin);
router.get('/registro', fomularioRegistro);


export default router