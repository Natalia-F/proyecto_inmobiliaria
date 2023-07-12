import express from 'express'
import {fomularioLogin, fomularioRegistro, fomularioForgetPass, registrar, confirmarCuenta, ForgetPass} from '../controllers/usuarioController.js'

const router = express.Router();

router.get('/login', fomularioLogin);

router.get('/registro', fomularioRegistro);
//para enviar datos de registro
router.post('/registro', registrar); 

//confirmar registro
router.get('/confirmar/:token', confirmarCuenta)


router.get('/forget-password', fomularioForgetPass);

router.post('/forget-password', ForgetPass);


export default router