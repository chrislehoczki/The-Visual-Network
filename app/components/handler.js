'use strict';


var React = require('react');
var Header = require("./Header.js")
var ReactDOM = require("react-dom")
var IndexHeader = require("./IndexHeader.js")

//GET PROPS




var index = document.getElementById("index-react-holder")
var dashboard = document.getElementById("dashboard-react-holder")
var user = document.getElementById("user-react-holder")

if (dashboard) {
	//RENDER CONTAINER
	var pins = JSON.parse(document.getElementById("pins").innerHTML)
	ReactDOM.render(<Header pins={pins} title={"The Visual Network"} />, document.getElementById("dashboard-react-holder"));
}
else if (index) {
	var pins = JSON.parse(document.getElementById("pins").innerHTML)
	ReactDOM.render(<IndexHeader pins={pins} type={"index"} title={"The Visual Network"} />, document.getElementById("index-react-holder"));
}
else if (user) {
	var userProps = JSON.parse(document.getElementById("userProps").innerHTML)
	ReactDOM.render(<IndexHeader userProps={userProps} type={"user"} title={"The Visual Network"} />, document.getElementById("user-react-holder"));
}





