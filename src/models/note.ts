import { sequelize } from "../database/connection";
import {  DataTypes, Model, Optional } from "sequelize";
import { NoteColors, NoteColor } from "../types";

export interface NoteAttributes {
    id: BigInt
    name: string
    content: string
    color: NoteColor 
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
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: true
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
            values: NoteColors,
            defaultValue: 'green' 
        }
    },
    {
        modelName: 'Note',
        createdAt: 'createdAt',
        updatedAt: 'latestUpdate',
        
    }
)
