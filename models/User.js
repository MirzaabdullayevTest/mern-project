const { Schema, model, Types } = require('mongoose')

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    links: [{ type: Types.ObjectId, ref: 'Link' }]  /* link modeli bilan ulash uchun */
})

module.exports = model('User', userSchema)