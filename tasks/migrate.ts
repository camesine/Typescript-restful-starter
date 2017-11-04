import { Connection } from '../config/db/Connection'

Connection.then(conn => {
    conn.migrations
})
