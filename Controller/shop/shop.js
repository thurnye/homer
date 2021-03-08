const UserData = require('../../Model/user')



//get the landingpage
exports.getlandingPage = (req, res, next) => { 
    res.render('shop/landingPage', {
        path: '/',
        pageTitle: 'Homer|Welcome'
    });
};



//get the interactiveAudio page
exports.getInteractiveAudioPage = (req, res, next) => { 
    res.render('shop/interactiveAudio', {
        path: '/audio',
        pageTitle: 'Homer| Audio Listening'
    });
};


//get the read the bookpage
exports.getReadTheBookPage = (req, res, next) => { 
    res.render('shop/readTheBook', {
        path: '/read-the-book',
        pageTitle: 'Homer| Book Reading'
    });
};


//get the homer the might roar page
exports.getHomePage = (req, res, next) => { 
    res.render('shop/home', {
        path: '/home',
        pageTitle: 'Homer| Home'
    });
};


//get the buy the book page
exports.getBuyTheBookPage = (req, res, next) => { 
    res.render('shop/buyBook', {
        path: '/buy-the-book',
        pageTitle: 'Homer| Buy The Book'
    });
};

//get the author page
exports.getAuthorPage = (req, res, next) => { 
    res.render('shop/author', {
        path: '/about-the-author',
        pageTitle: 'Homer| About the Author'
    });
};

