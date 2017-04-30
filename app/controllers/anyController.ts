import * as express from 'express'
import { IUserAttribute } from '../db/model/User'
import { UserService } from '../services/UserService'

export class AnyController {

    private UserService: UserService

    constructor() {
        this.UserService = new UserService()
    }

    public index = async (req: express.Request, res: express.Response) => {
        const result = await this.UserService.list()
        res.send(result)
    }

    public create = async (req: express.Request, res: express.Response) => {
        const user: IUserAttribute = req.body.user
        const result = await this.UserService.create(user)
        res.status(200).send(result)
    }

    public find = async (req: express.Request, res: express.Response) => {
        const id: number = req.params.id
        const result = await this.UserService.find(id)
        res.status(200).send(result)
    }

    public update = async (req: express.Request, res: express.Response) => {
        const user: IUserAttribute = req.body.user
        const result = await this.UserService.update(user)
        res.status(200).send(result)
    }

    public delete = async (req: express.Request, res: express.Response) => {
        const user = req.body.user
        const result = await this.UserService.delete(user)
        res.sendStatus(204)
    }

}
