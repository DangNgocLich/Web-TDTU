// config/auth.js
module.exports = {
    'googleAuth': {
        'clientID': '778577184334-ufmt60t13ahc4j2dhbr282fu62h8avfr.apps.googleusercontent.com',
        'clientSecret': '4QALRXjuUGS2LB7QfAkpXTZB',
        'callbackURL': process.env.NODE_ENV !== 'production' ? 'http://localhost:5000/api/auth/google/callback' : 'https://rocky-island-31211.herokuapp.com/api/auth/google/callback'
    }
};