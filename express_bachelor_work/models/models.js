const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING(320), allowNull: false, unique: true},
    phone_num: {type: DataTypes.STRING(50), allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING(300), allowNull: false},
    surname: {type: DataTypes.STRING(300), allowNull: false},
    bio: {type: DataTypes.TEXT},
    hideData: {type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false},
    createdAt: {type: DataTypes.DATE, allowNull: false},
    verifiedAt: {type: DataTypes.DATE}
});

const Admin = sequelize.define('admin', {
    admin_id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    status: {type: DataTypes.SMALLINT, allowNull: false},
    role: {type: DataTypes.STRING, allowNull: false, defaultValue: "Адмін"}
});

const Avatars = sequelize.define('avatars', {
    id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    data: {type: DataTypes.BLOB, allowNull: false},
    contentType: {type: DataTypes.STRING, allowNull: false}
});

const Notice = sequelize.define('notice', {
    id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    type: {type: DataTypes.SMALLINT, allowNull: false},
    kind: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: false},
    createdAt: {type: DataTypes.DATE, allowNull: false}
});

const Fundraise = sequelize.define('fundraise', {
    id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    type: {type: DataTypes.SMALLINT, allowNull: false},
    whom: {type: DataTypes.STRING, allowNull: false},
    kind: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: false},
    target_sum: {type: DataTypes.DECIMAL(2), allowNull: false},
    status: {type: DataTypes.SMALLINT, allowNull: false},
    createdAt: {type: DataTypes.DATE, allowNull: false}
});

const Result = sequelize.define('result', {
    id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    src_photo: {type: DataTypes.BLOB, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    createdAt: {type: DataTypes.DATE, allowNull: false}
});

const Photo = sequelize.define('photo', {
    photo_id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    src_photo: {type: DataTypes.BLOB, allowNull: false},
    contentType: {type: DataTypes.STRING, allowNull: false}
});

User.hasOne(Admin, {foreignKey: 'user_id', sourceKey: 'id'});
Admin.belongsTo(User, {foreignKey: 'user_id', targetKey: 'id', onDelete: 'cascade', onUpdate: 'cascade'});

User.hasOne(Avatars, {foreignKey: 'user_id', sourceKey: 'id'});
Avatars.belongsTo(User, {foreignKey: 'user_id', targetKey: 'id', onDelete: 'cascade', onUpdate: 'cascade'});

User.hasMany(Notice, {foreignKey: 'user_id', sourceKey: 'id'});
Notice.belongsTo(User, {foreignKey: 'user_id', targetKey: 'id', onDelete: 'cascade', onUpdate: 'cascade'});

User.hasMany(Fundraise, {foreignKey: 'user_id', sourceKey: 'id'});
Fundraise.belongsTo(User, {foreignKey: 'user_id', targetKey: 'id', onDelete: 'cascade', onUpdate: 'cascade'});

Notice.hasMany(Photo, {foreignKey: 'notice_id', sourceKey: 'id'});
Photo.belongsTo(Notice, {foreignKey: 'notice_id', targetKey: 'id', onUpdate: 'cascade'});

Fundraise.hasMany(Photo, {foreignKey: 'fundraise_id', sourceKey: 'id'});
Photo.belongsTo(Fundraise, {foreignKey: 'fundraise_id', targetKey: 'id', onUpdate: 'cascade'});

Fundraise.hasOne(Result, {foreignKey: 'fundraise_id', sourceKey: 'id'});
Result.belongsTo(Fundraise, {foreignKey: 'fundraise_id', targetKey: 'id', onDelete: 'cascade', onUpdate: 'cascade'});

Result.hasMany(Photo, {foreignKey: 'result_id', sourceKey: 'id'});
Photo.belongsTo(Result, {foreignKey: 'result_id', targetKey: 'id', onUpdate: 'cascade'});

module.exports = {
    User,
    Admin,
    Avatars,
    Notice,
    Fundraise,
    Result,
    Photo
};