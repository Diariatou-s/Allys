const Joi = require('joi');
// const sanitizeHtml = require('sanitize-html');

// const extension = (joi) => ({
//     type: 'string',
//     base: joi.string(),
//     messages: {
//         'string.escapeHTML': '{{#label}} must not include HTML!'
//     },
//     rules: {
//         escapeHTML: {
//             validate(value, helpers) {
//                 const clean = sanitizeHtml(value, {
//                     allowedTags: [],
//                     allowedAttributes: {},
//                 });
//                 if (clean !== value) return helpers.error('string.escapeHTML', { value })
//                 return clean;
//             }
//         }
//     }
// });

// const Joi = Basejoi.extend(extension)

module.exports.factureSchema = Joi.object({
    facture: Joi.object({
        num: Joi.string(),
        datecreation: Joi.string(),
        patient: Joi.object().required(),
        service: Joi.string().required(),
        imputation: Joi.boolean().required(),
        pourcentage: Joi.string().required(),
        autres: Joi.string(),
        enc: Joi.boolean(),
        facturier: Joi.object()
    }).required()
});