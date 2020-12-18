const {Usuario} = require('../models/');
const bcrypt = require('bcryptjs')
const servToken = require('./services/token')


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
    register :async (req, res, next) =>{
        try {
            //Register prueba
            const re = await Usuario.create(req.body)
            res.status(200).json(re)
        } catch (error) {
           res.status(500).json({'error': 'Oops paso algo'})
          next(error)
        }
    },
    login : async (req, res, next) => {

        try {
            const user = await User.findOne({
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
    

}