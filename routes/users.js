var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var passport = require('passport');
var router = express.Router();

//load user model
var User = require('../models/User');

//Routes for Sign in
router.get('/login', function(req,res){
    res.render('users/login');
});

router.get('/register', function(req,res){
    res.render("users/register");
});

//post routes

router.post('/login', function(req,res,next){
    passport.authenticate('local', {
        successRedirect:'/game/editgames',
        failureRedirect:'/users/login',
        failureFlash: true
    })(req,res,next);
});

router.post('/register', async function(req,res){
    console.log(req.body);
    var errors = [];

    if(req.body.password != req.body.password2){
        errors.push({text:"Passwords do not match."});
    }
    if(req.body.password.length < 4){
        errors.push({text:"Password is fewer than 4 characters."});
    }
    if(errors.length > 0){
        res.render('users/register',{
            errors:errors,
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            password2:req.body.password2
        });
    }else{
        try {
            var newUser = await User.create({
                name:req.body.name,
                email:req.body.email,
                password:bcrypt.hashSync(req.body.password),
            });
            res.redirect('/users/login');
        } catch(err) {
            console.log(err);
            errors.push({err:err});
            res.render('users/register',{
                errors:errors,
            });
            return;
        }
    }
});

router.get('/logout', function(req,res){
    req.logout();
    req.flash("success_msg", "You successfully logged out");
    res.redirect('/users/login');
});

module.exports = router;