const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const SECRET_KEY = 'MYSECRETKEY'

async function register(email,password) {
    const isExisting = await User.findOne({email}).collation({ locale:'en', strength:2 })
    
    if( isExisting ) {
        throw new Error('Email is taken')
    }
    const hashedPassword = await bcrypt.hash(password,10)
    
    const user = await User.create({
        email,
        hashedPassword
    });
    
    return createToken(user)
    
}
async function login(email,password) {
    const user = await User.findOne({email}).collation({locale: 'en', strength: 2})
    if(!user) {
        throw new Error ('Incorrect email or password')
    }
    
    const matchPassword = await bcrypt.compare(password, user.hashedPassword);
    if(!matchPassword) {
        throw new Error ('Incorrect email or password')
    }
    
    return createToken(user)
}
async function logout(email,password) {}

const createToken = function(user) {
    const payload = {
        _id: user._id,
        email: user.email
    };
    
   return {
       accessToken: jwt.sign(payload, SECRET_KEY),
       _id: user._id,
       email: user.email
   }
    
    
}

module.exports = {
    login,
    logout,
    register
}