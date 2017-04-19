import * as express from 'express'

const router = express.Router()

router.get('/index', (req: express.Request, res: express.Response) => {
    res.send("HOME INDEX")
})

router.get('/create', (req: express.Request, res: express.Response) => {
    res.send("HOME CREATE")
})

export default router
