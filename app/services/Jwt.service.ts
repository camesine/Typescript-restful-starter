import * as JWT from "jsonwebtoken";
import { environment } from "../../env";

export class JwtService {

    public signToken(params: { name: string, role: string }, options?: any): string {
        return JWT.sign(params, environment.app.secret, options || undefined);
    }

}
