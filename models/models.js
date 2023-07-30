const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Users = sequelize.define('Users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    fullName: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    photoAvatar: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Books = sequelize.define('Books', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING},
    type: {type: DataTypes.STRING},
    photo: {type: DataTypes.STRING},
    rating: {type: DataTypes.DECIMAL},
    isAlreadyRead: {type: DataTypes.BOOLEAN, allowNull: false},
    publicationYear: {type: DataTypes.STRING},
    authorId: {type: DataTypes.INTEGER, allowNull: false},
    userId: {type: DataTypes.INTEGER, allowNull: false},
})

const Authors = sequelize.define('Authors', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    firstName: {type: DataTypes.STRING, allowNull: false},
    lastName: {type: DataTypes.STRING,  allowNull: false},
})


Users.hasMany(Books, { foreignKey: 'userId' });
Books.belongsTo(Users, { foreignKey: 'userId' });

Authors.hasMany(Books, { foreignKey: 'authorId' });
Books.belongsTo(Authors, { foreignKey: 'authorId' });


module.exports = {
    Users,
    Books,
    Authors
};