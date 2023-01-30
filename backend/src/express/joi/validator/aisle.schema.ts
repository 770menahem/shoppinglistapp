import Joi = require('joi');

// joi schema for aisle
export const createSchema = Joi.object({
    body: {
        number: Joi.number().required(),
        direction: Joi.string().valid('vertical', 'horizontal', 'end-horizontal', 'end-vertical', 'start-horizontal', 'start-vertical').required(),
    },
});
