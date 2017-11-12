import { Connection } from '../config/Database'

Connection.then(conn => {
    conn.migrations
})
