import express from "express";
import userRoutes from './routes/userRoutes.js'

//Crear la app
const app = express()

//habilitar pug(templates)
app.set('view engine', 'pug')
app.set('views','./views')

//Routing
app.use('/auth', userRoutes)


//definir un puerto y arrancar el proyecto
const port = 3000
app.listen(port,()=>{
    console.log('el servidor esta en el puerto '+port)
})