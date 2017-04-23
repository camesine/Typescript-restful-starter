import * as JWT from 'jsonwebtoken'
import * as bearer from 'token-extractor'
import { config } from '../../config/config'

class JWTService {

    public signToken(params: {name: string, rol: string}, options?: string): Promise<string> {
        return new Promise((resolve, reject) => {
            JWT.sign(params, config.secret, options || null, (err, token) => {
                if (err)  reject(err)
                resolve(token)
            })
        })
    }

    public verifyToken(token: string, options: string): Promise<string> {
        return new Promise((resolve, reject) => {
           JWT.verify(token, config.secret, (err, decoded) => {
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

export const Service = new JWTService()
