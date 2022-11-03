const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const SECRET_KEY = 'MYSECRETKEY'
async function register(email,password) {
    const isExisting = await User.findOne({email}).collation({ locale:'en', strength:2 })
    
    if( isExisting ) {
        throw new Error('Email is taken')
    }
    const hashedPassword = bcrypt.hash(password,10)
    
    const user = await User.create({
        email,
        hashedPassword
    });
    return createToken(user)//return the token when we await register function
    
}
async function login(email,password) {}
async function logout(email,password) {}

const createToken = function(user) {
    const payload = {
        _id: user._id,
        email: user.email
    };
    
   return jwt.sign(payload, SECRET_KEY)//returns the token;
    
}