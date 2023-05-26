import Sequelize from 'sequelize'
import dotenv from 'dotenv'
dotenv.config({path: '.env'})

// BD - usuario - pass
const db = new Sequelize(process.env.BD_NAME,process.env.BD_USER,process.env.BD_PASS,{
    host: process.env.BD_HOST,
    port: process.env.BD_PORT,
    dialect: 'mysql',
    //cuando un usuario se registra se crea automatico
    define:{
        timestamps: true
    },
    //mantener o reutilizar conexiones activas max mantiene 5 abiertas
    pool:{
        max:5,
        min:0,
        //30 segundos antes de marcar un error
        acquire:30000,
        //tiempo que debe transcurrir para liberar memoria
        idle:10000
    }
});

export default db