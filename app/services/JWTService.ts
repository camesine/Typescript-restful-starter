import * as JWT from 'jsonwebtoken'
import * as bearer from 'token-extractor'
import { config } from '../../config'

export class JWTService {

    public static signToken(params: {name: string, role: string}, options?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            JWT.sign(params, config.SECRET, options || null, (err, token) => {
                if (err)  reject(err)
                resolve(token)
            })
        })
    }

    public static verifyToken(token: string, options: string): Promise<any> {
        return new Promise((resolve, reject) => {
           JWT.verify(token, config.SECRET, (err, decoded) => {
                if (err) reject(err)
                resolve(decoded)
            })
        })
    }

    public static extractToken(req) {
        return new Promise((resolve, reject) => {
            bearer(req, (err, token) => {
                if (err) return reject(err)
                resolve(token)
            })
        })
    }

}
