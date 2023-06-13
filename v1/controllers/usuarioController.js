import {check, validationResult} from 'express-validator'
import User from "../../models/Usuario.js";
import { generarId } from '../../helpers/tokens.js';

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
    const {firstname, lastname, email, password} = req.body

    //Validacion
    await check('firstname').notEmpty().withMessage('El nombre no debe ir vacio').run(req)
    await check('lastname').notEmpty().withMessage('El apellido no debe ir vacio').run(req)
    await check('email').isEmail().withMessage('Escriba un email valido').run(req)
    await check('password').isLength({min: 8}).withMessage('la contraseña debe tener almenos 8 carecteres').run(req)
    await check('password_confirm').equals(password).withMessage('Las contraseñas deben ser iguales').run(req)

    let resultado = validationResult(req)
    
    //verificar que no este vacio
    if (!resultado.isEmpty()) {
        //errores
        return res.render('auth/registro', {
            pagina : 'Crear Cuenta',
            errores : resultado.array(),
            usuario : {
                firstname: firstname,
                lastname: lastname,
                email: email
            }
         })
    }
    //verificar usuario duplicado
    const existUser = await User.findOne({where:{email}})

    if (existUser) {
        return res.render('auth/registro', {
            pagina : 'Crear Cuenta',
            errores : [{msg:'El email ya esta registrado'}],
            usuario : {
                firstname: firstname,
                lastname: lastname,
                email: email
            }
         })
    }
    
    //Alamcenar usuario
    await User.create({
        firstname,
        lastname,
        email,
        password,
        token:generarId()
    })

    //Mostrar mensaje de confirmacion
    res.render('templates/mensaje',{
        pagina: 'Cuenta Creada Correctamente',
        mensaje: 'Hemos enviado un email de confirmacion'
    })
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
