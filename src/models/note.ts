import { sequelize } from "../database/connection";
import { Model, DataTypes } from "sequelize";
import User from "./user";

export default class Note extends Model{
    declare id: BigInt
    declare label: string
}

Note.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    label: {
        type: DataTypes.STRING,
        allowNull: true,
    }
},
{
    sequelize,
    modelName: 'Note',
    createdAt: 'createdAt',
    updatedAt: 'latestUpdate',
    
})

Note.belongsTo(User,{
    as: 'User',
})