import express from 'express'
import {fomularioLogin, fomularioRegistro, fomularioForgetPass, registrar, confirmarCuenta, forgetPass, tokenForgetPass, newPassword} from '../controllers/usuarioController.js'

const router = express.Router();

router.get('/login', fomularioLogin);

router.get('/registro', fomularioRegistro);
//para enviar datos de registro
router.post('/registro', registrar); 

//confirmar registro
router.get('/confirmar/:token', confirmarCuenta)


router.get('/forget-password', fomularioForgetPass);
router.post('/forget-password', forgetPass);

//almacenar nuevo password
router.get('/reset-password/:token', tokenForgetPass);
router.post('/reset-password/:token', newPassword);

export default router