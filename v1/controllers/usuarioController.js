import {check, validationResult} from 'express-validator'
import Usuario from "../../models/Usuario.js";


const fomularioLogin = (req, res) => {
    res.render('auth/login', {
        pagina : 'Iniciar Sesión'
    })
};

const fomularioRegistro = (req, res) => {
    res.render('auth/registro', {
       pagina : 'Crear Cuenta' 
    })
};

const registrar = async (req, res) => {
    //Validacion
    await check('firstname').notEmpty().run(req)

    let resultado = validationResult(req)
    res.json(resultado.array())
    
    const usuario = await Usuario.create(req.body)
    res.json(usuario)
};

const fomularioForgetPass = (req, res) => {
    res.render('auth/forget-password', {
       pagina : 'Recuperar Acceso' 
    })
};

export {
    fomularioLogin,
    fomularioRegistro,
    registrar,
    fomularioForgetPass,
}

//simplificar la misma ruta '/' pero se diferencia en get y post
/*
router.route('/')
    .get(function(req,res){
        res.json({msg : "Hola mundo con express"})
    })
    .post(function(req,res){
        res.json({msg : "Hola mundo con express post"})
    })
*/
