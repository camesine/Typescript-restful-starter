import { number, object, string } from "joi";

export const createSchema = object().keys({
    text: string().required(),
});

export const updateSchema = object().keys({
    id: number().required(),
    text: string().required(),
});

export const deleteSchema = object().keys({
    id: number().required(),
});
