import express from 'express'
import {fomularioLogin, fomularioRegistro, fomularioForgetPass, registrar} from '../controllers/usuarioController.js'

const router = express.Router();

router.get('/login', fomularioLogin);

router.get('/registro', fomularioRegistro);
router.post('/registro', registrar); //para enviar info


router.get('/forget-password', fomularioForgetPass);


export default router