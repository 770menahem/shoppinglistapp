import * as Joi from 'joi';

export const createSchema = Joi.object({
    query: {
        name: Joi.string().required(),
    },
});

export const updateSchema = Joi.object({
    query: {
        name: Joi.string().required(),
    },
});
