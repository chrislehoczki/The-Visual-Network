'use strict';

var path = process.cwd();
var passport = require('passport');

var ServerHandler = require("../controllers/serverHandler.js")

//REACT
var React = require('react');
var ReactDOM = require("react-dom")
var ReactDOMServer = require("react-dom/server")
var ReactBootstrap = require("react-bootstrap")
var bodyParser   = require('body-parser');
//USER SCHEMA	
var Users = require('../models/users.js');
	
//MAIN OBJECT CONSTRUCTOR

module.exports = function (app, passport) {

	var serverHandler = new ServerHandler();

	//////////////////////////////						
	//AUTHENTICATION STRATEGIES///
	//////////////////////////////

	// route middleware to make sure a user is logged in
	function isLoggedIn(req, res, next) {

	    // if user is authenticated in the session, carry on 
	    if (req.isAuthenticated())
	        return next();

	    // if they aren't redirect them to the home page
	    res.redirect('/login');
	}

    //TWITTER LOGIN

    app.get('/auth/twitter', passport.authenticate('twitter'));

    // handle the callback after twitter has authenticated the user
    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect : '/',
            failureRedirect : '/login'
        }));



	//LOCAL

    app.post('/signup', 
    	passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/failure' // redirect back to the signup page if there is an error
    }));
    

     // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/signinfailure' // redirect back to the signup page if there is an error
    }));

    app.route("/failure")
    	.get(function (req, res) {
    		res.send("There was an error when trying to add you as a user, perhaps you left a field blank?")
    	})
    app.route("/signinfailure")
    	.get(function (req, res) {
    		res.send("There was an error logging you in, please check your username and password.")
    	})

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/');
		});


   

    //////////////////////////////						
	//PAGE RENDERS////////////////
	//////////////////////////////


	//API////////////////
	app.route('/login')
		.get(function (req, res) {

			var IndexHeader = React.createFactory(require("../components/IndexHeader.js"));


			Users.find({}, { pins: 1, _id: 0 })
			.exec(function (err, result) {
					if (err) { throw err; }

					var pinsArray = [];
            		result.map(function(userData) {
              		var pins = userData.pins

                	pins.map(function(pin) {
                    pinsArray.push(pin)
                	})

            		})

            		var markup = ReactDOMServer.renderToString(IndexHeader({pins: pinsArray, title: "The Visual Network", type: "index"}))
            		res.render("index", {markup: markup, pins: JSON.stringify(pinsArray)});
				});
		});

	app.route('/')
		.get(isLoggedIn, function (req, res) {

			var Header = React.createFactory(require("../components/Header.js"));



			Users.find({}, { pins: 1, _id: 0 })
			.exec(function (err, result) {
					if (err) { throw err; }

					var pinsArray = [];
            		result.map(function(userData) {
              		var pins = userData.pins

                	pins.map(function(pin) {
                    pinsArray.push(pin)
                	})

            		})

            		var markup = ReactDOMServer.renderToString(Header({pins: pinsArray, type: "index", title: "The Visual Network"}));

            		res.render("dashboard", {markup: markup, pins: JSON.stringify(pinsArray)});
				});

			
		});

	app.route('/user/:id')
		.get(function (req, res) {

			var IndexHeader = React.createFactory(require("../components/IndexHeader.js"));

			var id = req.params.id;
			var query = {"_id": id};

			Users.findOne(query, { pins: 1, "twitter.username" : 1, "local.username:": 1 })
				.exec(function (err, result) {
						if (err) { throw err; }
						console.log(result)


						var markup = ReactDOMServer.renderToString(IndexHeader({userProps: result, title: "PinStar", type: "user"}));
						res.render("user", {userProps: JSON.stringify(result)});
					});	


			
			
		});







	//////////////////////////////						
	//////API HANDLERS////////////
	//////////////////////////////	

	//ADD PINS
	app.route('/api/addpin') 
		.post(serverHandler.addPin)

	//GET ALL PINS
	app.route('/api/getallpins')
		.get(serverHandler.getAllPins)

	//GET PINS FOR USER
	app.route('/api/getuserpins')
		.get(serverHandler.getUserPins)

	//UPVOTE A PIN
	app.route("/api/addvote")
		.post(serverHandler.addVote)

	//DELETE A PIN
	app.route("/api/deletepin")
		.post(serverHandler.deletePin)


	//////////////////////////////						
	//////USER DETAIL CHANGES/////
	//////////////////////////////	



		//ADD CITY AND STATE
	app.route("/api/userinfo")
		.post(serverHandler.addUserInfo)

		//CHANGE PASSWORD
	app.route("/changepass")
		.post(serverHandler.changePass)

		//GET USER DETAILS
	app.route("/api/userdata")
		.get(serverHandler.getUserDetails)

	//////////////////////////////						
	//////SIGNUP FORM ////////////
	//////////////////////////////	

	//CHECK LIST OF CURRENT USERS
	app.route('/checkuser/:user')
		.get(serverHandler.getUsers);

};