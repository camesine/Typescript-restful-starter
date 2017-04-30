import { User } from '../app/db/model/User'


User.sync().then(() => {
    console.log("Table user created")
})
