import {check, validationResult} from 'express-validator'
import bcrypt from 'bcrypt'
import User from "../../models/Usuario.js";
import { generarId } from '../../helpers/tokens.js';
import {emailRegistro, emailForgetPass} from '../../helpers/emails.js'

const fomularioLogin = (req, res) => {
    res.render('auth/login', {
        pagina : 'Iniciar Sesión'
    })
};

const fomularioRegistro = (req, res) => {
    res.render('auth/registro', {
       pagina : 'Crear Cuenta',
       csrfToken : req.csrfToken() 
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
            csrfToken : req.csrfToken(),
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
            csrfToken : req.csrfToken(),
            errores : [{msg:'El email ya esta registrado'}],
            usuario : {
                firstname: firstname,
                lastname: lastname,
                email: email
            }
         })
    }
    
    //Alamcenar usuario
    const user = await User.create({
        firstname,
        lastname,
        email,
        password,
        token:generarId()
    })

    //Enviar email de confirmacion
    emailRegistro({
        firstname: user.firstname,
        email: user.email,
        token: user.token    
    })

    //Mostrar mensaje de confirmacion
    res.render('templates/mensaje',{
        pagina: 'Cuenta Creada Correctamente',
        mensaje: 'Hemos enviado un email de confirmacion, revisa tu bandeja de entrada'
    })
};

//Funcion para comprobar cuenta
const confirmarCuenta = async (req,res) =>{
    const {token} = req.params
    
    //verificar token
    const user = await User.findOne({where :{token}})

    if(!user){
         //Mostrar mensaje de error
        return res.render('templates/mensaje', {
            pagina: 'Error al validar tu cuenta',
            mensaje: 'Hubo un error al confirmar tu cuenta, intenta nuevamente',
            error: true
        })
    }
    
    //confirmar cuenta
    user.token = null
    user.confirmed = true
    await user.save()

    return res.render('templates/mensaje', {
        pagina: 'Verificacion exitosa',
        mensaje: 'Hemos validado tu cuenta, accede a ella para continuar.'
        
    })
}

const fomularioForgetPass = (req, res) => {
    res.render('auth/forget-password', {
        csrfToken : req.csrfToken(),
        pagina : 'Recuperar Acceso' 
    })
};

const forgetPass = async (req, res) => {
    
    await check('email').isEmail().withMessage('Escriba un email valido').run(req)

    let resultado = validationResult(req)

    if (!resultado.isEmpty()) {
        res.render('auth/forget-password', {
            csrfToken : req.csrfToken(),
            pagina : 'Recuperar Acceso',
            errores : resultado.array() 
        })
    }

    //Buscar usuario
    const {email} = req.body
    const user = await User.findOne({where :{email}})
    
    if (!user) {
        return res.render('templates/mensaje', {
            pagina: 'Error al validar tu cuenta',
            mensaje: 'Al parecer este email no se encuentra registrado.',
            error: true
        })
    }

    //generar nuevo token
    user.token = generarId()
    await user.save()
    

    //Enviar email de confirmacion
    emailForgetPass({
        firstname: user.firstname,
        email: user.email,
        token: user.token    
    })

    //Mostrar mensaje de confirmacion
    res.render('templates/mensaje',{
        pagina: 'Cuenta Recuperada Correctamente',
        mensaje: 'Hemos enviado un email para recuperar tu cuenta, revisa tu bandeja de entrada'
    })

    
};

const tokenForgetPass = async (req,res) =>{
    console.log('Token recibido:', req.params);
    const {token} = req.params;
    

    const user = await User.findOne({where : {token}})
    if (!user) {
        return res.render('templates/mensaje', {
            pagina: 'Error al validar tu cuenta',
            mensaje: 'Hubo un error al validar la informacion, intenta nuevamente.',
            error: true
        })
    }

    //formulario modificar password
    res.render('auth/reset-password',{
        pagina : 'Reestablece tu passsword',
        csrfToken : req.csrfToken()
    })

    
}

const newPassword = async (req,res) =>{
    const {password} = req.body
    await check('password').isLength({min: 8}).withMessage('la contraseña debe tener almenos 8 carecteres').run(req)
    await check('password_confirm').equals(password).withMessage('Las contraseñas deben ser iguales').run(req)

    let resultado = validationResult(req)
    
    //verificar que no este vacio
    if (!resultado.isEmpty()) {
        //errores
        return res.render('auth/reset-password', {
            pagina : 'Reestablece tu passsword',
            csrfToken : req.csrfToken(),
            errores : resultado.array()
         })
    }
    console.log('hola')
    const {token} = req.params;

    const user = await User.findOne({where : {token}})

    //hashear password y eliminar token
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password,salt)
    user.token = null;

    await user.save()

    res.render('templates/mensaje',{
        pagina: 'Contraseña Modificada',
        mensaje: 'Se ha modificado tu contraseña correctamente'
    })
}

export {
    fomularioLogin,
    fomularioRegistro,
    registrar,
    confirmarCuenta,
    fomularioForgetPass,
    forgetPass,
    tokenForgetPass,
    newPassword
}


