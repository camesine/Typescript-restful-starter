import * as Sequelize from 'sequelize'
import { db } from '../db'

export interface IUserAttribute {
   id?: number,
   name?: string[2]
}

export interface IUserInstance extends Sequelize.Instance<IUserAttribute>, IUserAttribute {}
export interface IUserModel extends Sequelize.Model<IUserInstance, IUserAttribute> {}

export const User = db.define<IUserInstance, IUserAttribute>('User', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
    },
    name: {
        type: db.Sequelize.STRING,
    },
}, {
        tableName: 'User',
        timestamps: false,
    })
