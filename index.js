import express from 'express'
import csrf from 'csurf'
import cookieParser from 'cookie-parser'
import usuarioRoutes from './v1/routes/usuarioRoutes.js'
import db from './config/db.js'

//crear la app
const app = express()

//habilitar lectura de datos en formularios
app.use(express.urlencoded({extended:true}))

//habilitar cookie parser
app.use(cookieParser())

//habilitar csurf
app.use(csrf({cookie : true}))

//conexion BD
try {
    await db.authenticate();
    db.sync()
    console.log('Conexion correcta a la db')
} catch (error) {
    console.log(error)
}

//Habilitar pug
app.set('view engine', 'pug')
app.set('views','./v1/views')

//Carpeta Publica
app.use(express.static('public'))

//Routing
app.use('/auth',usuarioRoutes)

//definir puerto
const port = 3000;
app.listen(port, () => {
    console.log('puerto en :' + port)
})

