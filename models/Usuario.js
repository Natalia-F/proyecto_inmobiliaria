import {DataTypes} from 'sequelize'
import bcrypt from 'bcrypt'
import db from '../config/db.js'

const User = db.define('users', {
    firstname: {
        type: DataTypes.STRING,
        allowNull: false, //no puede ir vacio
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false, //no puede ir vacio
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    token: DataTypes.STRING,
    confirmed: DataTypes.BOOLEAN
},{
    hooks:{
        beforeCreate: async function (usuario) {
            const salt = await bcrypt.genSalt(10)
            usuario.password = await bcrypt.hash(usuario.password,salt)
        }
    }
});

export default User