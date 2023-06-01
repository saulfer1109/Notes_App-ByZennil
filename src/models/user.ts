import { sequelize } from '../database/connection'
import { DataTypes, Optional, Model } from 'sequelize'
import { Note } from './note';

export interface UserAttributes{
    id: bigint;
    name: string;
    email: string;
    password: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes,'id'>{}


export interface UserInstance extends Model<UserAttributes,UserCreationAttributes>,UserAttributes{
    createdAt?: Date;
    updatedAt?: Date;
}


export const User = sequelize.define<UserInstance, UserAttributes>(
    'User',
    {
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
        modelName: 'User',
        timestamps: false,
    }
)

User.hasMany(Note, {
    foreignKey: 'userId',
    sourceKey: 'id'
})

User.hasMany(Note,{
    foreignKey: 'userId',
    sourceKey: 'id',
    as: 'notes'
})