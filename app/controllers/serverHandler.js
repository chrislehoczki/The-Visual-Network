'use strict';

var Users = require('../models/users.js');

var bodyParser = require('body-parser');

function ServerHandler () {


	this.addPin = function(req, res) {

		var url = req.body.url;
		var title = req.body.title;
		var id;
		var date = new Date();

		var query = {"twitter.id": req.user.twitter.id};
			if (req.user.local.username) {
				query = {"local.username": req.user.local.username};
			}

		Users.findOne(query, {_id: 1})
		.exec(function(err, result) {
			console.log(result)
			id = result._id

				var user = req.user.twitter.displayName;
				if (req.user.local.username) {
					user = req.user.local.username;
				}

				var pin = {
					url: url,
					title: title,
					user: user,
					date: date,
					id: id,
					created: date,
					upVotes: []
				}


			Users
			.findOneAndUpdate(query, { $push: { pins: pin } }, {"new": true})
			.exec(function (err, result) {
				if (err) { throw err; }
				console.log(result)

				res.json(result);

			});

		})

	},

	this.deletePin = function(req, res) {

	var query = {"twitter.id": req.user.twitter.id};
			if (req.user.local.username) {
				query = {"local.username": req.user.local.username};
			}

	Users
		.findOneAndUpdate(query, { $pull: { "pins": { url : req.body.url} }}, {"new": true})
		.exec(function (err, result) {
		if (err) { throw err; }
			

			res.json("You successfully deleted the pin.");

		});

	},

	this.getAllPins = function(req, res) {

		Users.find({}, { pins: 1, _id: 0 })
			.exec(function (err, result) {
				if (err) { throw err; }

				var pinsArray = [];
        		result.map(function(userData) {
	          		var pins = userData.pins

	            	pins.map(function(pin) {
	                pinsArray.push(pin)
	            	})

	            	function compare(a,b) {
						  return b.date - a.date;
						}

						pinsArray.sort(compare)

        		})
				res.json(pinsArray);
			});


	},

	this.getUserPins = function(req, res) {

			var query = {"twitter.id": req.user.twitter.id};
			if (req.user.local.username) {
				query = {"local.username": req.user.local.username};
			}


		Users.findOne(query, { pins: 1, _id: 0 })
			.exec(function (err, result) {
					if (err) { throw err; }

					function compare(a,b) {
						  return b.date - a.date;
						}
					result.pins.sort(compare)

					res.json(result);
				});

	},

	this.addVote = function (req, res) {

		if (!req.user) {
			res.json("You must be logged in to upVote!")
		}

		var query = {"_id": req.body.user, "pins.title": req.body.title};


		Users.findOneAndUpdate(query, {$addToSet: {"pins.$.upVotes" : req.user._id}}, {"new": true})
		.exec(function (err, result) {
			res.end()
		})

	},

	this.getUsers = function(req, res) {

		var username = req.params.user;
		var message;

		Users.find({}, { "local.username": 1, _id: 0 })
			.exec(function (err, result) {
					if (err) { throw err; }
					var taken = false;
					result.map(function(user) {
						console.log(user)
						if (user.local.username === username) {

							message = "That username is taken."
							var obj = {}
							obj.message = message
							obj.alert = "warning"
					
							res.json(obj)
							taken = true;
						}
					})
					if (!taken) {
						message = "Your username is available."
						var obj = {}
						obj.message = message
						obj.alert = "success"
						res.json(obj)
					}

				});

	},



	this.addUserInfo = function(req, res) {
		var country = req.body.country;
		var city = req.body.city;
		var fullName = req.body.fullName

		//CUSTOM QUERY BASED ON FACEBOOK OR LOCAL LOGIN
			var query = {"twitter.id": req.user.twitter.id};
			if (req.user.local.username) {
				query = {"local.username": req.user.local.username};
			}
		
		Users
			.findOneAndUpdate(query, { $set: { country: country, city: city, fullName: fullName } }, {"new": true})
			.exec(function (err, result) {
					if (err) { throw err; }
					
					var user = {};
					user.city = result.city;
					user.country = result.country;
					user.fullName = result.fullName
					

					res.json(user);
					
					});
	
	},

	this.changePass = function(req, res, next) {
		//req.body contains currentpass, newpass and newpassconfirmed
		if (req.body.newpass !== req.body.newpassconfirmed) {
        throw new Error('password and confirm password do not match');
     }

     var User = req.user;

     User.local.password = req.body.newpass;
     
     //PASSPORT SHOULD RECOGNISE THAT PASSWORD IS CHANGED AND HASH IT BEFORE SAVING....
     User.save(function(err, result){
         if (err) { next(err) }
         else {
             res.json(result)
         }
     });

	},


	this.getUserDetails = function(req, res) {

		var query = {"twitter.id": req.user.twitter.id};
			if (req.user.local.username) {
				query = {"local.username": req.user.local.username};
			}

		Users.findOne(query, { _id: 0 })
			.exec(function (err, result) {
					if (err) { throw err; }
				var name = result.fullName || result.local.username || result.twitter.username;
				var country = result.city;
				var city = result.country;

				var user = {}
				user.name = name;
				user.city = city;
				user.country = country;

				res.json(user)
			});


		}


}

module.exports=ServerHandler;