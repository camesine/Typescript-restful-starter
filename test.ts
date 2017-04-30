import { test } from 'ava'
import * as request from 'request-promise'
import { User } from './app/db/model/User'

test.before('setup database', async t => {
    const userRecord = User.create({name: "Name test"})
    console.log(userRecord)
})

test.after('Cleanup database', async t => {
    User.destroy()
})

test('test', async t => {
    console.log("")
})
