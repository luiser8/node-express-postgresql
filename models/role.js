import { DataTypes } from "sequelize";
import database from "../config/database.js";

const Role = database.define('role', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    name: {type: DataTypes.STRING},
    status: {type: DataTypes.BOOLEAN, default: true}
},{
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});

export default Role;