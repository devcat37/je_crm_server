const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const App = sequelize.define('app', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
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

App.hasOne(Webview)
Webview.belongsTo(App)