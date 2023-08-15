const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const {Users} = require("../models/models")
const jwt = require("jsonwebtoken")


const generateJwt = (id, email, role, fullName) => {
    return jwt.sign(
        {id, email, role, fullName},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}


class UserController {
    async registration(req, res, next) {
        const {email, password, role, fullName} = req.body
        let finalFullName = fullName
        if(!email || !password) {
            return next(ApiError.badRequest('Incorrect email or password'))
        }
        if(!fullName) {
            finalFullName = "Noname"
        }

        const candidate = await Users.findOne({where: {email}})
        if(candidate) {
            return next(ApiError.badRequest('User with such email already exists'))
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const user = await Users.create({email, role, password: hashPassword, fullName: finalFullName})
        const token = generateJwt(user.id, email, role, finalFullName)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await Users.findOne({where: {email}})
        if(!user) {
            return next(ApiError.badRequest('User has not found'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword) {
            return next(ApiError.badRequest('Incorrect password'))
        }
        const token = generateJwt(user.id, email, user.role, user.fullName)
        return res.json({token})
    }


    //check and refresh token
    async check(req, res, next) {
       const token = generateJwt(req.user.id, req.user.email, req.user.role, req.user.fullName)
        return res.json({token})
    }
}

module.exports = new UserController()