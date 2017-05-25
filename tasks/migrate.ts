import { Sample } from '../app/models/Sample'


Sample.sync().then(() => {
    console.log("Table sample created")
})
