const mongoose = require('mongoose');
const bcrypt = require('bcrytjs');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true});

//Hash PW Before save
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next()    ;
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

UserSchema.methods.matchPassword = async function(entered) {
    return bcrypt.compare(entered, this.password);
};

module.exports = mongoose. model('User', UserSchema);
