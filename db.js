const { Sequelize } = require('sequelize');

/*const sequelize = new Sequelize(
    process.env.DB_NAME,
    null,
    null,
    {
        host: process.env.DB_HOST,
        dialect: 'mssql',
        dialectOptions: {
            options: {
                encrypt: true, // Используйте false, если вы не хотите использовать SSL
                trustedConnection: true
                // instanceName: 'YourInstanceName' // Только если у вас есть несколько экземпляров SQL Server
            }
        }
    }
);*/
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: "localhost",
    port: 1433,
    dialect: "mssql",
    dialectOptions: {
        options: { encrypt: true }
    },
    logging: console.log
});

module.exports = sequelize;