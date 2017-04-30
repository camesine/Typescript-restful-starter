import * as express from 'express'
import { IUserAttribute } from '../db/model/User'
import { UserService } from '../services/UserService'

export class AnyController {

    private UserService: UserService

    constructor() {
        this.UserService = new UserService()
    }

    public index = async (req: express.Request, res: express.Response) => {
        const response = await this.UserService.list()
        res.send(response)
    }

    public create = async (req: express.Request, res: express.Response) => {
        const user: IUserAttribute = req.body.user
        const response = this.UserService.create(user)
        res.send(200, "Created")
    }

    public update = async (req: express.Request, res: express.Response) => {
        const user: IUserAttribute = req.body.user
        const response = this.UserService.update(user)
        res.send(200, "Updated")
    }

    public delete = async (req: express.Request, res: express.Response) => {
        const user = req.body.user
        const response = this.UserService.delete(user)
        res.send("Deleted")
    }

}
