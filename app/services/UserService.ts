import { IUserAttribute, IUserInstance ,IUserModel, User } from '../db/model/User'

export class UserService {

    public User: IUserModel

    constructor() {
        this.User = User
    }

    public create = (user: IUserAttribute) => {
        return this.User.create(user)
    }

    public list = () => {
       return this.User.findAll()
    }

    public find = (id: number) => {
       return this.User.findById(id)
    }

    public update = (user: IUserAttribute) => {
        return this.User.update({
            name: user.name,
        }, {
            where: {
                id: user.id,
            },
        })
    }

    public delete = (user: IUserAttribute) => {
        return this.User.destroy({where: {id: user.id}})
    }

}
