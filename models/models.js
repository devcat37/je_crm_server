const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const App = sequelize.define('app', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING, allowNull: false},
        // app_bundle_ios: {type: DataTypes.STRING, unique: true, allowNull: true},
        // app_bundle_android: {type: DataTypes.STRING, unique: true, allowNull: true},
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

const Analytics = sequelize.define('analytics', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    session_id: {type: DataTypes.STRING, allowNull: true},
    link: {type: DataTypes.STRING, allowNull: false},
    params: {type: DataTypes.TEXT, allowNull: true},
})


const BundleId = sequelize.define('bundle_id', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    app_bundle_ios: {type: DataTypes.STRING, unique: true, allowNull: true},
    app_bundle_android: {type: DataTypes.STRING, unique: true, allowNull: true},
    type: {type: DataTypes.ENUM, values: ['debug', 'release']},
})

App.hasOne(Webview)
Webview.belongsTo(App)

App.hasMany(BundleId)
BundleId.belongsTo(App)

App.hasOne(Appsflyer)
Appsflyer.belongsTo(App)

App.hasOne(Apphud)
Apphud.belongsTo(App)

App.hasMany(Analytics)
Analytics.belongsTo(App)

module.exports = {
    App, Webview, Appsflyer, Apphud, Analytics, BundleId,
}