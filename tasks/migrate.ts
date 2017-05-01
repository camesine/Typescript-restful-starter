import { Sample } from '../app/db/models/Sample'


Sample.sync().then(() => {
    console.log("Table sample created")
})
