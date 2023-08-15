const {Books, Authors} = require("../models/models")
const ApiError = require("../error/ApiError")
const uuid = require("uuid")
const path = require("path")

class BooksController {
    async create(req, res, next) {
        const {name, description, type, rating, isAlreadyRead, publicationYear, authorId, userId } = req.body
        const {photo} = req.files
        let fileName = uuid.v4() + ".jpg"
        photo.mv(path.resolve(__dirname, '..', 'static', fileName))

        try {
            const books = await Books.create({name, description, type, photo: fileName, rating, isAlreadyRead, publicationYear, authorId, userId})
            return res.json(books)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }


    async getAll(req, res, next) {
        let {authorId, isAlreadyRead, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let books;

        if (!authorId && !isAlreadyRead) {
            books = await Books.findAndCountAll({limit, offset})
        }
        if (authorId && !isAlreadyRead) {
            books = await Books.findAndCountAll({where: {authorId}, limit, offset})
        }
        if (!authorId && isAlreadyRead) {
            books = await Books.findAndCountAll({where: {isAlreadyRead}, limit, offset})
        }
        if (authorId && isAlreadyRead) {
            books = await Books.findAndCountAll({where: {authorId, isAlreadyRead}, limit, offset})
        }
        return res.json(books)
    }

    async getById(req, res) {

    }

}

module.exports = new BooksController()