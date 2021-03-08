const path = require('path');
const express = require('express')
const {check, body} = require('express-validator/check')
const router = express.Router()
const FormDataController = require('../Controller/auth/formDataController')
const User = require('../Model/user')
router.get('/signup', FormDataController.getSignupPage); //form page



router.post('/signup',[
    //Email Validation
    check('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .custom( (value, {req}) => {
        //Check for existing email
        return User.findOne({email: value})
        .then(user => {
            if (user) {
              return Promise.reject('E-mail already in use');
            }
          })
    })
    .normalizeEmail(),

    //Password Validation
    body('password', 'Please enter a password with at least 6 characters long')
    .isLength({ min: 6 })
    .matches(/\d/)
    .withMessage('Password must be at least 6 characters long and must contain a number')
    .trim()

], FormDataController.postSignupPage); //sent data to db


router.get('/login', FormDataController.getLogin) 


router.post('/login',[
    //email validation
    body('email')
    .isEmail()
    .withMessage('Invalid Email or Password')
    .custom( (value, {req}) => {
        //Check for existing email
        return User.findOne({email: value})
        .then(userDoc => {
            if(!userDoc) {
                return Promise.reject('Account does not exist')
            }
        })
    })
    .normalizeEmail(),

    //password validation
    body('password', 'Invalid Email or Password')
    .isLength({ min: 6 })
    .matches(/\d/)
    .withMessage('Invalid Email or Password')
    .trim()

], FormDataController.postLogin) 

module.exports = router;