import express from 'express'
import {fomularioLogin, fomularioRegistro, fomularioForgetPass} from '../controllers/usuarioController.js'

const router = express.Router();

router.get('/login', fomularioLogin);
router.get('/registro', fomularioRegistro);
router.get('/forget-password', fomularioForgetPass);


export default router