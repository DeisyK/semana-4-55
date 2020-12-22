const {Usuario} = require('../models/');
const bcrypt = require('bcryptjs')
const servToken = require('../services/token')


module.exports = {
    list :async (req, res, next) =>{
        try {
        const re = await Usuario.findAll()
        res.status(200).json(re)
        
        
        } catch (error) {
            res.status(500).json({'error': 'Oops paso algo'})
        next(error)
        }
    },
    add :async (req, res, next) =>{
        try {
            //Register prueba
            const newEncriptePassword = bcrypt.hashSync(req.body.password)
            const re = await Usuario.create({nombre: req.body.nombre, rol:req.body.rol, password: newEncriptePassword,
                email: req.body.email, estado: req.body.estado})
            res.status(200).json(re)
            
        } catch (error) {
           res.status(500).json({'error': 'Oops paso algo'})
          next(error)
        }
        
    },
    login : async (req, res, next) => {

        try {
            const user = await Usuario.findOne({
                where: {
                    email: req.body.email
                }
            })
            if (user) {
                // Evaluar contraseña
                const contrasenhaValida = bcrypt.compareSync(req.body.password, user.password)
                if (contrasenhaValida) {
                    const token = servToken.encode(user.id, user.rol) 

                    res.status(200).send({
                        auth: true,
                        tokenReturn: token,
                        user: user
                    })

                } else {
                    res.status(401).send({auth: false, tokenReturn: null, reason:'Contraseña no coincide'})
                }

            } else {
                res.status(404).send( 'Usuario no existe')
            }

        } catch (error) {
            res.status(500).json({
                'error': 'Oops paso algo'
            })
            next(error)
        }


    },
    update: async (req, res, next) => {
        try {
            //Buscar al usuario
            // const user = await Usuario.findOne({where: {email: req.body.email}})

            //Ver si la contraseña es valida
            // const validPassword = bcrypt.compareSync(req.body.password, user.password)

            //Buscar mi contraseña encriptada
            // const newEncriptePassword = bcrypt.hashSync(req.body.newpassword)
            // if (validPassword){
            //     const re = await Usuario.update({nombre: req.body.nombre, password: newEncriptePassword},{where:{id: req.body.id}})
            // }
            // else{
            //     res.status(401).send({auth: false, tokenReturn: null, reason:'Contraseña no coincide'})
            // }
            // res.status(200).json(re)
            const newEncriptePassword = bcrypt.hashSync(req.body.password)
            const re = await Usuario.update({nombre: req.body.nombre, rol:req.body.rol, password: newEncriptePassword,
                    email: req.body.email},{where:{id: req.body.id}})
            const updatedUser = await Usuario.findOne({where:{id: req.body.id}})
            res.status(200).json(updatedUser)
        } catch (error) {
           res.status(500).json({'error': 'Oops paso algo'})
          next(error)
        }

     },
     activate: async (req, res, next) => {
        try {
           const re = await Usuario.update({estado: 1},{where:{id: req.body.id}})
        //    res.status(200).json(re)
        const activatedUser = await Usuario.findOne({where:{id: req.body.id}})
        res.status(200).json(activatedUser)
        } catch (error) {
           res.status(500).json({'error': 'Oops paso algo'})
          next(error)
        }
     },
     deactivate: async (req, res, next) => {
        try {
           const re = await Usuario.update({estado: 0},{where:{id: req.body.id}})
        //    res.status(200).json(re)
        const deactivatedUser = await Usuario.findOne({where:{id: req.body.id}})
        res.status(200).json(deactivatedUser)
        } catch (error) {
           res.status(500).json({'error': 'Oops paso algo'})
          next(error)
        }
     },

}