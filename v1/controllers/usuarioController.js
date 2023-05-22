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

export {
    fomularioLogin,
    fomularioRegistro
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