import { sequelize } from "../database/connection";
import {  DataTypes, Model, Optional } from "sequelize";


export interface NoteAttributes {
    id: BigInt
    label: string
    description: string 
    userId?:BigInt
}

export interface NoteCreationAttributes extends Optional<NoteAttributes,'id'>{}


export interface NoteInstance extends Model<NoteAttributes, NoteCreationAttributes>, NoteAttributes{
    createdAt: Date
    updatedAt: Date
}


export const Note = sequelize.define <NoteInstance,NoteCreationAttributes>(

    'Note',
    {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        label: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        modelName: 'Note',
        createdAt: 'createdAt',
        updatedAt: 'latestUpdate',
        
    }
)
