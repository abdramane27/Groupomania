const fs = require("fs")
const path = require("path")
const Sequelize = require("sequelize")
const config = require("../config/db.config.js");
const basename = path.basename(__filename)

const db = {}

const sequelize = new Sequelize(config.DB,
    config.USER,
    config.PASSWORD,
    {
      host: config.HOST,
      dialect: config.dialect,
      operatorsAliases: false,
  
      pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
      }
    }
  );

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === ".js")
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
        db[model.name] = model
    })

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db)
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

db.users = require("./user.js")(sequelize, Sequelize)
db.messages = require("./message.js")(sequelize, Sequelize)
db.comments = require("./comment.js")(sequelize, Sequelize)

db.comments.belongsTo(db.messages)
db.comments.belongsTo(db.users)
db.messages.hasMany(db.comments)
db.messages.belongsTo(db.users)
db.users.hasMany(db.messages)
db.users.hasMany(db.comments)

module.exports = db