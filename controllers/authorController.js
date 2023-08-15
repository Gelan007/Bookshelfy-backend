const {Authors} = require("../models/models")
const ApiError = require("../error/ApiError")



class AuthorController {
    async create(req, res) {
        const {firstName, lastName} = req.body
        const authors = await Authors.create({firstName, lastName})
        return res.json(authors)
    }

    async getAll(req, res) {
        const authors = await Authors.findAll()
        return res.json(authors)
    }

}

module.exports = new AuthorController()