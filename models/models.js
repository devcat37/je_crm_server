const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const App = sequelize.define('app', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING, allowNull: false},
        app_bundle_ios: {type: DataTypes.STRING, unique: true, allowNull: true},
        app_bundle_android: {type: DataTypes.STRING, unique: true, allowNull: true},
    }
)

const Webview = sequelize.define('webview', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        reference: {type: DataTypes.STRING, allowNull: false},
        enabled: {type: DataTypes.BOOLEAN, defaultValue: false},
    }
)

const Appsflyer = sequelize.define('appsflyer', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    dev_key: {type: DataTypes.STRING, allowNull: false},
    appsflyer_app_id: {type: DataTypes.STRING, allowNull: false},
})

const Apphud = sequelize.define('apphud', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    api_key: {type: DataTypes.STRING, allowNull: false},
})

App.hasOne(Webview)
Webview.belongsTo(App)

App.hasOne(Appsflyer)
Appsflyer.belongsTo(App)

App.hasOne(Apphud)
Apphud.belongsTo(App)

module.exports = {
    App, Webview, Appsflyer, Apphud
}