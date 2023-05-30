/* import { sequelize } from "../connection";
import { Model, DataTypes } from "sequelize";

class Note extends Model{
    declare id: BigInt
    declare label: string
    declare registerDate: Date
    declare userId: BigInt
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
    },
    registerDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
},
{
    
}) */