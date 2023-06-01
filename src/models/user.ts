import { UserAttributes } from '../types';
import { sequelize } from '../database/connection'
import { Model, DataTypes } from 'sequelize'
import Note from './note';

export default class User extends Model<UserAttributes> 
implements UserAttributes{
    declare id: bigint
    declare name: string;
    declare email: string;
    declare password: string;

}

User.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,   
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'SHA256',

    }

},{
    sequelize,
    modelName: 'User',
    timestamps: false,
})

User.hasMany(Note,{
    as: 'Note',
})