import * as Sequelize from 'sequelize'
import { db } from '../db'

export interface IUserAttr {
    id?: number
    FullName?: string
}

export interface IUserInstance extends Sequelize.Instance<IUserAttr> {
    id?: number
    FullName?: string
}

export const User = db.define<IUserInstance, IUserAttr>('User', {
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    FullName: {
        type: Sequelize.STRING },
    }, {
        tableName: 'User',
        timestamps: false,
    },
)

