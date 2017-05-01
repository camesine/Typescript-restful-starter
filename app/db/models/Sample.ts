import * as Sequelize from 'sequelize'
import { db } from '../db'

export interface ISampleAttribute {
   id?: number,
   text?: string
}

export interface ISampleInstance extends Sequelize.Instance<ISampleAttribute>, ISampleAttribute {}
export interface ISampleModel extends Sequelize.Model<ISampleInstance, ISampleAttribute> {}

export const Sample = db.define<ISampleInstance, ISampleAttribute>('Sample', {
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    text: {
        type: db.Sequelize.STRING,
    },
}, {
        tableName: 'sample',
        timestamps: false,
    })
