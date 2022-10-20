import { DataTypes } from "sequelize";
import database from "../config/database.js";

const Users = database.define('users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    roleid: { type: DataTypes.INTEGER, references: { model: 'Role', key: 'id' } },
    firstname: {type: DataTypes.STRING},
    lastname: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING},
    username: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
    accesstoken: {type: DataTypes.STRING, allowNull: true},
    refreshtoken: {type: DataTypes.STRING, allowNull: true},
    createdat: { type: DataTypes.DATE, allowNull: true },
    updatedat: { type: DataTypes.DATE, allowNull: true },
    status: {type: DataTypes.BOOLEAN, default: true}
},{
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});

export default Users;