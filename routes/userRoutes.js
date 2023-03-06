import express from "express";

//Crear la app
const router = express.Router()

//Routing
router.get('/login',function(req,res) {
    res.render('auth/login')
})

export default router