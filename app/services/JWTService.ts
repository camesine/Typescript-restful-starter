import * as JWT from 'jsonwebtoken'
import * as bearer from 'token-extractor'
import { config } from '../../config/config'

export class JWTService {

    public signToken(params: {name: string, role: string}, options?: string): Promise<string> {
        return new Promise((resolve, reject) => {
            JWT.sign(params, config.SECRET, options || null, (err, token) => {
                if (err)  reject(err)
                resolve(token)
            })
        })
    }

    public verifyToken(token: string, options: string): Promise<string> {
        return new Promise((resolve, reject) => {
           JWT.verify(token, config.SECRET, (err, decoded) => {
                if (err) reject(err)
                resolve(decoded)
            })
        })
    }

    public extractToken(req) {
        return new Promise((resolve, reject) => {
            bearer(req, (err, token) => {
                if (err) return reject(err)
                resolve(token)
            })
        })
    }

}
