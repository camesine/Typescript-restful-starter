// declare module "token-extractor";

import * as express from "express";

export = token_extractor;

declare function token_extractor(req: express.Request, cb: ((err: Error, token: string) => void)): string;

declare namespace token_extractor {
    const prototype: {
    };
}