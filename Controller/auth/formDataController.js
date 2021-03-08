const UserData = require('../../Model/user')
    , bcrypt = require('bcryptjs')
    , { validationResult } = require('express-validator/check')



//Sign Up page
exports.getSignupPage = (req, res, next) => {
    let message = req.flash('error');
    if(message.length > 0){
        message = message[0];
    }else {
        message = null;
    }
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Homer| SignUp',
        errorMessage: message,
        OldUserInput: {
            firstName:"",
            lastName: "",
            email: "",
            password: "",
        },
        validationErrors: []
    });
};


//save input to database
exports.postSignupPage = (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        console.log(errors.array()[0].msg)
        console.log(errors.array());
        return res.status(422).render('auth/signup', {
            path: '/signup',
            pageTitle: 'Homer| SignUp',
            errorMessage: errors.array()[0].msg,
            OldUserInput: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
            },
            validationErrors: errors.array()

        })
    }
//Hash Password
    bcrypt
    .hash(password, 12)
    .then(hashedPassword => {
        const data = new UserData({
           name: [{firstName, lastName}],
            email: email,
            password: hashedPassword
            })
       return data.save()
    })
    .then((result) => {
        console.log('Data Created');
        res.redirect('/login');
        //here we can send an email to the user 
    })
    .catch(err => {
        console.log(err);
        const error = new Error (err)
        error.httpStatusCode = 500;
        return next(err)
    })

};

//Get Login
exports.getLogin = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    }else {
        message = null;
    }
    res.render('auth/login', {
        path:'/login',
        pageTitle: 'Homer|Login',
        errorMessage: message,
        OldUserInput: {
            email: "",
            password: "",
        },
        validationErrors: []
    }) 
}

// Post Login
exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        console.log(errors.array()[0].msg)
        console.log(errors.array());
        return res.status(422).render('auth/login', {
            path: '/login',
            pageTitle: 'Homer|Login',
            errorMessage: errors.array()[0].msg,
            OldUserInput: {
                email: email,
                password: password
            },
            validationErrors: errors.array()
        })
    }

//Find the user
UserData.findOne({email: email})
.then(user => {
    if(!user){ 
        //Delete after this
        console.log('No User found!!!');  
    } 
    bcrypt
    .compare(password, user.password)
    .then(doMatch => {
        if (doMatch){
            req.session.isLoggedIn = true;
            req.session.user = user
            return req.session.save(err => {
                console.log(err)
                res.redirect('/home');
            })
        }
        res.redirect('/login')
    })
    .catch(err => {
        console.log(err);
        res.redirect('/login');
    })

})
.catch(err=>{
    console.log(err);
    const error = new Error (err);
    error.httpStatusCode = 500;
    return next(err)
});

}