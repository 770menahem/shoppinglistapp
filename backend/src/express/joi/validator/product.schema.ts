import * as Joi from 'joi';

export const createSchema = Joi.object({
    body: {
        name: Joi.string().required(),
    },
});

export const updateSchema = Joi.object({
    body: {
        name: Joi.string().required(),
    },
});
