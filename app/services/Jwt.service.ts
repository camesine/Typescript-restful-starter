import * as JWT from "jsonwebtoken";
import { config } from "../../config";

export class JwtService {

    public signToken(params: { name: string, role: string }, options?: any): string {
        return JWT.sign(params, config.SECRET, options || undefined);
    }

}
