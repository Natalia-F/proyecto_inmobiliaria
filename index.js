import express from 'express'
import usuarioRoutes from './v1/routes/usuarioRoutes.js'

//crear la app
const app = express()

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

