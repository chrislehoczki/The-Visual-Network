(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//var appUrl = window.location.origin;

var ajaxFunctions = {
   ready: function ready(fn) {
      if (typeof fn !== 'function') {
         return;
      }

      if (document.readyState === 'complete') {
         return fn();
      }

      document.addEventListener('DOMContentLoaded', fn, false);
   },
   ajaxRequest: function ajaxRequest(method, url, callback) {
      var xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function () {
         if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            callback(xmlhttp.response);
         }
      };

      xmlhttp.open(method, url, true);
      xmlhttp.send();
   },
   postRequest: function postRequest(method, url, params, callback) {
      var xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function () {
         if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            callback(xmlhttp.response);
         }
      };

      xmlhttp.open(method, url, true);
      xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xmlhttp.send(params);
   }
};

module.exports = ajaxFunctions;

},{}],2:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactBootstrap = (typeof window !== "undefined" ? window['ReactBootstrap'] : typeof global !== "undefined" ? global['ReactBootstrap'] : null);
var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;
var ajaxFunctions = require("../common/ajax-functions.js");
var AddPinModal = React.createClass({
    displayName: "AddPinModal",


    getInitialState: function getInitialState() {
        return {
            url: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRshP-HTInRkI265bTUoAjix4nc-Mwmh7uWJ_o14CFvow5du6PJOGb_BoQ"
        };
    },

    changeUrl: function changeUrl(e) {
        var url = e.target.value;

        this.setState({ url: url });
    },

    changeTitle: function changeTitle(e) {

        var title = e.target.value;
        this.setState({ title: title });
    },

    addPin: function addPin() {

        var component = this;
        var url = "/api/addpin";

        var imgUrl = this.state.url;
        var title = this.state.title;

        var params = "url=" + imgUrl + "&title=" + title;
        console.log(params);
        ajaxFunctions.postRequest("POST", url, params, function (data) {
            console.log(data);
            component.props.getMyPins();
            component.props.hideMessage();
        });
    },

    render: function render() {

        var inline = {
            display: "inline"
        };

        var center = {
            textAlign: "center"
        };

        var image = {
            width: "100px",
            height: "100px",
            margin: "5px auto",
            display: "block"
        };

        var form = {
            textAlign: "center"
        };

        return React.createElement(
            "div",
            null,
            React.createElement(
                Modal,
                { style: center, show: this.props.showMessage },
                React.createElement(
                    Modal.Body,
                    null,
                    React.createElement("img", { style: image, src: this.state.url }),
                    React.createElement(
                        "h2",
                        null,
                        " Add Your Pin "
                    ),
                    React.createElement(
                        "div",
                        { className: "form-group" },
                        React.createElement(
                            "label",
                            null,
                            "Pin Url"
                        ),
                        React.createElement("input", { type: "text", onBlur: this.changeUrl, className: "form-control", name: "url" })
                    ),
                    React.createElement(
                        "div",
                        { className: "form-group" },
                        React.createElement(
                            "label",
                            null,
                            "Pin Title"
                        ),
                        React.createElement("input", { type: "text", onKeyUp: this.changeTitle, className: "form-control", name: "title" })
                    ),
                    React.createElement(
                        "button",
                        { onClick: this.addPin, type: "submit", className: "btn btn-primary" },
                        "Submit"
                    )
                ),
                React.createElement(
                    Modal.Footer,
                    null,
                    React.createElement(
                        Button,
                        { onClick: this.props.hideMessage },
                        "Close"
                    )
                )
            )
        );
    }
});

module.exports = AddPinModal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../common/ajax-functions.js":1}],3:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var Profile = require("./Profile.js");
var MyPins = require("./MyPins.js");
var RecentPins = require("./RecentPins.js");
var ContentContainer = React.createClass({
    displayName: "ContentContainer",


    getInitialState: function getInitialState() {
        return {};
    },

    render: function render() {

        return React.createElement(
            "div",
            { className: "content-container" },
            this.props.tab === "Recent Pins" ? React.createElement(
                "div",
                null,
                React.createElement(
                    "h1",
                    null,
                    " The Visual Network "
                ),
                React.createElement(
                    "h2",
                    null,
                    " Create collections and share your images. "
                ),
                React.createElement(RecentPins, { pins: this.props.pins })
            ) : null,
            this.props.tab === "My Pins" ? React.createElement(
                "div",
                null,
                React.createElement(
                    "h1",
                    null,
                    " My Pins "
                ),
                React.createElement(MyPins, { pins: this.props.pins })
            ) : null,
            this.props.tab === "Profile" ? React.createElement(Profile, null) : null
        );
    }

});
module.exports = ContentContainer;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./MyPins.js":10,"./Profile.js":11,"./RecentPins.js":14}],4:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var HeaderButtons = require("./HeaderButtons.js");
var ContentContainer = require("./ContentContainer.js");

var ajaxFunctions = require("../common/ajax-functions.js");

var Header = React.createClass({
  displayName: "Header",


  getInitialState: function getInitialState() {
    return {
      tab: "Recent Pins"
    };
  },

  componentDidMount: function componentDidMount() {
    //this.getAllPins()

  },

  getAllPins: function getAllPins() {
    var url = "/api/getallpins";
    var component = this;
    ajaxFunctions.ajaxRequest("GET", url, function (data) {
      console.log(data);
      component.setState({ pins: data });
    });
  },

  changeTab: function changeTab(tabName) {
    if (tabName !== "Sign Out") {
      this.setState({ tab: tabName });
    }
  },

  render: function render() {

    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { id: "rct-header", className: "header" },
        React.createElement(
          "div",
          { id: "title-bundle" },
          React.createElement(
            "p",
            { id: "rct-title", className: "title" },
            " ",
            this.props.title,
            " "
          )
        ),
        React.createElement(
          "div",
          { id: "button-bundle" },
          React.createElement(HeaderButtons, { changeTab: this.changeTab, links: ["Sign Out", "Profile", "My Pins", "Recent Pins"] })
        )
      ),
      React.createElement(ContentContainer, { pins: this.props.pins, tab: this.state.tab })
    );
  }
});

module.exports = Header;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../common/ajax-functions.js":1,"./ContentContainer.js":3,"./HeaderButtons.js":6}],5:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var HeaderButton = React.createClass({
    displayName: "HeaderButton",


    getInitialState: function getInitialState() {
        return {};
    },

    changeTab: function changeTab() {

        this.props.changeTab(this.props.name);
    },

    render: function render() {

        return React.createElement(
            "button",
            { onClick: this.changeTab, id: "rct-btn", className: "btn-header  btn btn-primary" },
            " ",
            React.createElement(
                "a",
                { href: this.props.href },
                this.props.name,
                " "
            )
        );
    }
});
module.exports = HeaderButton;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],6:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var HeaderButton = require("./HeaderButton.js");

var HeaderButtons = React.createClass({
  displayName: "HeaderButtons",


  getInitialState: function getInitialState() {
    return {};
  },

  changeTab: function changeTab(tabName) {
    this.props.changeTab(tabName);
  },

  render: function render() {

    var component = this;
    return React.createElement(
      "div",
      null,
      this.props.links.map(function (link) {
        var href = "#";
        if (link === "Sign Out") {
          href = "/logout";
        }

        return React.createElement(HeaderButton, { changeTab: component.changeTab, href: href, key: link, name: link });
      })
    );
  }
});

module.exports = HeaderButtons;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./HeaderButton.js":5}],7:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var SignupModal = require("./SignupModal.js");
var LoginModal = require("./LoginModal.js");
var ajaxFunctions = require("../common/ajax-functions.js");

var PublicPin = require("./PublicPin.js");
var IndexContent = React.createClass({
    displayName: "IndexContent",


    getInitialState: function getInitialState() {
        return {
            pins: []
        };
    },

    componentDidMount: function componentDidMount() {
        this.getAllPins();
    },

    getAllPins: function getAllPins() {
        var url = "/api/getallpins";
        var component = this;
        ajaxFunctions.ajaxRequest("GET", url, function (data) {
            data = JSON.parse(data);
            console.log(data);
            component.setState({ pins: data }, function () {
                component.loadMasonry();
            });
        });
    },

    loadMasonry: function loadMasonry() {

        var elem = document.querySelector('.grid');
        var msnry = new Masonry(elem, {
            // options
            itemSelector: '.grid-item',
            transitionDuration: '0.8s'

        });

        // element argument can be a selector string
        //   for an individual elemen

        imagesLoaded('.grid').on('progress', function () {
            // layout Masonry after each image loads
            msnry.layout();
        });
    },

    loadUserData: function loadUserData() {},

    render: function render() {

        var component = this;

        var buttonStyle = {
            margin: "0px auto",
            width: "300px",
            display: "block"
        };
        return React.createElement(
            "div",
            { className: "public-container" },
            React.createElement(
                "h1",
                null,
                " The Visual Network "
            ),
            React.createElement(
                "h2",
                null,
                " Create collections and share your images. "
            ),
            React.createElement(
                "a",
                { style: buttonStyle, className: "btn btn-social btn-twitter", href: "/auth/twitter" },
                React.createElement("span", { className: "fa fa-twitter" }),
                " Sign In with Twitter"
            ),
            React.createElement(
                "div",
                { className: "grid" },
                this.state.pins.map(function (pin) {
                    return React.createElement(PublicPin, { reload: component.loadMasonry, showMessage: component.props.showMessage, key: pin.title + "," + pin.url, data: pin });
                })
            )
        );
    }
});

module.exports = IndexContent;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../common/ajax-functions.js":1,"./LoginModal.js":9,"./PublicPin.js":12,"./SignupModal.js":15}],8:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var HeaderButtons = require("./HeaderButtons.js");
var ContentContainer = require("./ContentContainer.js");
var SignupModal = require("./SignupModal.js");
var LoginModal = require("./LoginModal.js");
var ajaxFunctions = require("../common/ajax-functions.js");
var IndexContent = require("./IndexContent.js");
var UserContent = require("./UserContent.js");

var Header = React.createClass({
  displayName: "Header",


  getInitialState: function getInitialState() {
    return {
      showModal: false,
      showLoginModal: false
    };
  },

  showMessage: function showMessage() {
    this.setState({ showModal: true });
  },

  hideMessage: function hideMessage() {
    this.setState({ showModal: false });
  },

  showLoginModal: function showLoginModal() {
    this.setState({ showLoginModal: true });
  },

  hideLoginModal: function hideLoginModal() {
    this.setState({ showLoginModal: false });
  },

  changeModal: function changeModal() {
    this.setState({ showLoginModal: false });
    this.setState({ showModal: true });
  },

  render: function render() {
    var component = this;

    //THIS FUNCTION DECLARES WHETHER IT IS INDEX PAGE OR SPECIFIC USER PAGE THAT IS RENDERED
    function changeContent() {
      var contentContainer;

      if (component.props.type === "index") {
        return React.createElement(IndexContent, { showMessage: component.showMessage, pins: component.props.pins });
      } else if (component.props.type === "user") {
        return React.createElement(UserContent, { showMessage: component.showMessage, user: component.props.userProps });
      }
    }

    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "header" },
        React.createElement(
          "p",
          { className: "public-title" },
          " ",
          this.props.title,
          " "
        ),
        React.createElement(
          "button",
          { onClick: this.showLoginModal, className: "public-btn-header btn btn-primary" },
          " Log In "
        ),
        React.createElement(
          "button",
          { onClick: this.showMessage, className: "public-btn-header btn btn-primary" },
          " Sign Up "
        )
      ),
      changeContent(),
      React.createElement(SignupModal, { showMessage: this.state.showModal, hideMessage: this.hideMessage }),
      React.createElement(LoginModal, { changeModal: this.changeModal, showMessage: this.state.showLoginModal, hideMessage: this.hideLoginModal })
    );
  }
});

module.exports = Header;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../common/ajax-functions.js":1,"./ContentContainer.js":3,"./HeaderButtons.js":6,"./IndexContent.js":7,"./LoginModal.js":9,"./SignupModal.js":15,"./UserContent.js":16}],9:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactBootstrap = (typeof window !== "undefined" ? window['ReactBootstrap'] : typeof global !== "undefined" ? global['ReactBootstrap'] : null);
var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;
var ajaxFunctions = require("../common/ajax-functions.js");
var SignupModal = React.createClass({
    displayName: "SignupModal",


    getInitialState: function getInitialState() {
        return {
            userOK: false,
            passwordOK: false
        };
    },

    sendForm: function sendForm() {

        var component = this;
        //MAKE PARAMS HERE
        var url = "/login";

        var username = this.state.user;
        var password = this.state.password;
        var params = "username=" + username + "&password=" + password;
        console.log(params);
        ajaxFunctions.postRequest("POST", url, params, function (data) {
            if (data.length < 100) {
                console.log(data);
                component.setState({ errorMessage: data });
            } else {
                window.location.replace("/");
            }
        });
    },

    addUser: function addUser(e) {
        var user = e.target.value;
        this.setState({ user: user });
    },

    addPassword: function addPassword(e) {
        var password = e.target.value;
        this.setState({ password: password });
    },

    createErrorMarkup: function createErrorMarkup(data) {
        if (!data) {
            return null;
        }
        return { __html: '<div class="alert alert-' + 'danger' + '">' + data + '</div>' };
    },

    render: function render() {

        var inline = {
            display: "inline"
        };

        var center = {
            textAlign: "center"
        };

        var image = {
            width: "100px",
            height: "100px"
        };

        var form = {
            textAlign: "center"
        };

        return React.createElement(
            "div",
            null,
            React.createElement(
                Modal,
                { style: center, show: this.props.showMessage },
                React.createElement(
                    Modal.Body,
                    { style: center },
                    React.createElement(
                        "h2",
                        null,
                        " Log In "
                    ),
                    React.createElement(
                        "div",
                        { className: "signup-container" },
                        React.createElement(
                            "a",
                            { className: "btn btn-social btn-twitter btn-block", href: "/auth/twitter" },
                            React.createElement("span", { className: "fa fa-twitter" }),
                            " Sign in with Twitter"
                        ),
                        React.createElement(
                            "h4",
                            { className: "form-element" },
                            " Or Login With Username "
                        ),
                        React.createElement(
                            "div",
                            { className: "form-group" },
                            React.createElement(
                                "label",
                                null,
                                "Username"
                            ),
                            React.createElement("input", { onKeyUp: this.addUser, type: "text", className: "form-control", name: "username" })
                        ),
                        React.createElement(
                            "div",
                            { className: "form-group" },
                            React.createElement(
                                "label",
                                null,
                                "Password"
                            ),
                            React.createElement("input", { onKeyUp: this.addPassword, type: "password", className: "form-control", name: "password" })
                        ),
                        React.createElement(
                            "button",
                            { type: "submit", onClick: this.sendForm, className: "btn btn-primary btn-block" },
                            "Sign In"
                        ),
                        React.createElement("div", { dangerouslySetInnerHTML: this.createErrorMarkup(this.state.errorMessage) }),
                        React.createElement(
                            "p",
                            { className: "form-element" },
                            " Not got an account yet? "
                        ),
                        " ",
                        React.createElement(
                            "button",
                            { onClick: this.props.changeModal, className: "show-signup btn btn-secondary" },
                            " Sign Up "
                        )
                    )
                ),
                React.createElement(
                    Modal.Footer,
                    null,
                    React.createElement(
                        Button,
                        { onClick: this.props.hideMessage },
                        "Close"
                    )
                )
            )
        );
    }
});

module.exports = SignupModal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../common/ajax-functions.js":1}],10:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var AddPinModal = require("./AddPinModal.js");
var UserPin = require("./UserPin.js");
var ajaxFunctions = require("../common/ajax-functions.js");

var MyPins = React.createClass({
    displayName: "MyPins",


    getInitialState: function getInitialState() {
        return {
            showModal: false,
            pins: []
        };
    },

    componentDidMount: function componentDidMount() {
        this.getMyPins();
    },

    getMyPins: function getMyPins() {
        var url = "/api/getuserpins";
        var component = this;
        ajaxFunctions.ajaxRequest("GET", url, function (data) {
            data = JSON.parse(data);
            console.log(data);
            component.setState({ pins: data.pins }, function () {

                component.reloadMasonry();
            });
        });
    },

    showMessage: function showMessage() {
        this.setState({ showModal: true });
    },

    hideMessage: function hideMessage() {
        this.setState({ showModal: false });
    },

    reloadMasonry: function reloadMasonry() {

        var elem = document.querySelector('.grid');
        var msnry = new Masonry(elem, {
            // options
            itemSelector: '.grid-item',
            transitionDuration: '0.8s'
        });

        imagesLoaded('.grid').on('progress', function () {
            // layout Masonry after each image loads
            msnry.layout();
        });
    },

    render: function render() {
        var component = this;

        var addPin = {
            width: "300px",
            padding: "10px",
            margin: "40px auto",
            display: "block"
        };
        return React.createElement(
            "div",
            null,
            React.createElement(
                "button",
                { style: addPin, className: "btn btn-primary", onClick: this.showMessage },
                " Add Pin "
            ),
            React.createElement(
                "div",
                { className: "grid" },
                this.state.pins.map(function (pin) {
                    return React.createElement(UserPin, { reload: component.reloadMasonry, getMyPins: component.getMyPins, key: pin.title + "," + pin.url, data: pin });
                })
            ),
            React.createElement(AddPinModal, { getMyPins: component.getMyPins, showMessage: this.state.showModal, hideMessage: this.hideMessage })
        );
    }
});

module.exports = MyPins;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../common/ajax-functions.js":1,"./AddPinModal.js":2,"./UserPin.js":17}],11:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ajaxFunctions = require("../common/ajax-functions.js");
var Profile = React.createClass({
  displayName: "Profile",


  getInitialState: function getInitialState() {
    return {
      city: "",
      state: "",
      name: "",
      message: ""
    };
  },

  componentDidMount: function componentDidMount() {
    this.getDetails();
  },

  getDetails: function getDetails() {
    console.log("this should get user details");

    var component = this;
    var apiUrl = "/api/userdata";
    ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
      console.log(data);
      data = JSON.parse(data);
      component.setState({ name: data.name, city: data.city, country: data.country }, function () {
        console.log(component.state);
      });
    });
  },

  addNewPass: function addNewPass(e) {

    this.setState({ newPass: e.target.value }, console.log(this.state.newPass));
  },

  addNewPassConfirmed: function addNewPassConfirmed(e) {

    this.setState({ newPassConfirmed: e.target.value }, function () {

      if (this.state.newPassConfirmed !== this.state.newPass) {
        this.setState({ message: "New passwords do not match." });
      } else {
        this.setState({ message: "" });
      }
    });
  },

  sendUserData: function sendUserData(e) {

    e.preventDefault();
    var component = this;
    $.ajax({
      contentType: 'application/json',
      data: JSON.stringify({ "city": this.state.newCountry, "country": this.state.newCity, "fullName": this.state.newName }),
      dataType: 'json',
      success: function success(data) {
        console.log(data);
        component.setState({ name: data.fullName, city: data.city, country: data.country }, function () {});
      },
      error: function error() {
        console.log("It failed");
      },
      processData: false,
      type: 'POST',
      url: '/api/userinfo'
    });
  },

  setNewCountry: function setNewCountry(e) {
    this.setState({ newCountry: e.target.value });
  },

  setNewCity: function setNewCity(e) {
    this.setState({ newCity: e.target.value });
  },

  setNewName: function setNewName(e) {
    this.setState({ newName: e.target.value });
  },

  render: function render() {

    var welcomeText = "Welcome " + this.state.name;

    if (this.state.city && this.state.country) {
      welcomeText += " from " + this.state.city + ", " + this.state.country;
    }

    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "user-details" },
        React.createElement(
          "h4",
          null,
          " ",
          welcomeText,
          " "
        ),
        React.createElement("br", null),
        React.createElement(
          "h4",
          null,
          " Add Location Details "
        ),
        React.createElement(
          "form",
          { className: "form", action: "/api/userinfo", method: "POST" },
          React.createElement(
            "div",
            { className: "form form-group" },
            React.createElement(
              "label",
              null,
              " Name "
            ),
            React.createElement("input", { onChange: this.setNewName, className: "form-control", type: "text", placeholder: "Add your full name", name: "name" })
          ),
          React.createElement(
            "div",
            { className: "form form-group" },
            React.createElement(
              "label",
              null,
              " Country "
            ),
            React.createElement("input", { onChange: this.setNewCountry, className: "form-control", type: "text", placeholder: "Add your country", name: "city" })
          ),
          React.createElement(
            "div",
            { className: "form form-group" },
            React.createElement(
              "label",
              null,
              " City "
            ),
            React.createElement("input", { onChange: this.setNewCity, className: "form-control", type: "text", placeholder: "Add your city", name: "country" })
          ),
          React.createElement(
            "button",
            { onClick: this.sendUserData, className: "btn btn-primary", type: "submit" },
            " Submit "
          )
        )
      ),
      React.createElement(
        "div",
        { className: "user-details" },
        React.createElement(
          "h4",
          null,
          " Change Password "
        ),
        React.createElement(
          "form",
          { className: "form", action: "/changepass", method: "POST" },
          React.createElement(
            "div",
            { className: "alert alert-warning" },
            " ",
            this.state.message,
            " "
          ),
          React.createElement(
            "div",
            { className: "form form-group" },
            React.createElement(
              "label",
              null,
              " Current Password "
            ),
            React.createElement("input", { className: "form-control", type: "password", name: "password" })
          ),
          React.createElement(
            "div",
            { className: "form form-group" },
            React.createElement(
              "label",
              null,
              " New Password "
            ),
            React.createElement("input", { className: "form-control", type: "password", name: "newpass", onChange: this.addNewPass })
          ),
          React.createElement(
            "div",
            { className: "form form-group" },
            React.createElement(
              "label",
              null,
              " Confirm New Password "
            ),
            React.createElement("input", { className: "form-control", type: "password", name: "newpassconfirmed", onChange: this.addNewPassConfirmed })
          ),
          React.createElement(
            "button",
            { className: "btn btn-primary", type: "submit" },
            " Submit "
          )
        )
      )
    );
  }

});
module.exports = Profile;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../common/ajax-functions.js":1}],12:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var PublicPin = React.createClass({
    displayName: "PublicPin",


    getInitialState: function getInitialState() {
        return {
            src: this.props.data.url,
            titleStyle: {
                float: "left",
                width: "80%",
                transition: "transition: all 0.5s ease"
            }
        };
    },

    imgError: function imgError() {
        this.setState({ src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/drizzle.jpg" });
    },

    componentDidMount: function componentDidMount() {
        this.reduceTitle();
    },

    extendTitle: function extendTitle() {

        var titleStyle = {
            float: "center",
            width: "100%",
            height: "auto",
            Zindex: "999"
        };
        var component = this;

        var title = this.props.data.title;
        this.setState({ title: title, titleStyle: titleStyle }, function () {
            component.props.reload();
        });
    },

    reduceTitle: function reduceTitle() {

        var titleStyle = {
            float: "left",
            width: "80%"
        };

        var title = this.props.data.title;
        if (title.length > 20) {
            title = title.substr(0, 17) + "...";
        }

        this.setState({ title: title, titleStyle: titleStyle });
    },

    loginMessage: function loginMessage() {
        this.props.showMessage();
    },

    render: function render() {

        var inline = {
            display: "inline",
            float: "right",
            margin: "2px",
            marginRight: "5px",
            overflow: "hidden"
        };

        var left = {
            float: "left",
            width: "80%",
            height: "10px",
            color: "#1c2ac9"
        };

        var clear = {
            clear: "both",
            marginTop: "2px"
        };

        var href = "/user/" + this.props.data.id;

        return React.createElement(
            "div",
            { className: "grid-item", onMouseOver: this.extendTitle, onMouseOut: this.reduceTitle },
            React.createElement("img", { onError: this.imgError, key: this.props.data.title + "," + this.props.data.url, src: this.state.src }),
            React.createElement(
                "div",
                { className: "details" },
                React.createElement(
                    "p",
                    { style: this.state.titleStyle },
                    " ",
                    this.state.title,
                    " "
                ),
                React.createElement(
                    "div",
                    { style: clear },
                    React.createElement(
                        "a",
                        { className: "user-link", href: href, style: left },
                        " ",
                        this.props.data.user,
                        " "
                    ),
                    React.createElement(
                        "p",
                        { style: inline },
                        " ",
                        this.props.data.upVotes.length,
                        " "
                    ),
                    " ",
                    React.createElement("i", { onClick: this.loginMessage, style: inline, className: "fa fa-heart" })
                )
            )
        );
    }
});

module.exports = PublicPin;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],13:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactBootstrap = (typeof window !== "undefined" ? window['ReactBootstrap'] : typeof global !== "undefined" ? global['ReactBootstrap'] : null);
var ajaxFunctions = require("../common/ajax-functions.js");

var Tooltip = ReactBootstrap.Tooltip;

var RecentPin = React.createClass({
    displayName: "RecentPin",


    getInitialState: function getInitialState() {
        return {
            src: this.props.data.url,
            titleStyle: {
                float: "left",
                width: "80%",
                transition: "transition: all 0.5s ease"
            }
        };
    },

    imgError: function imgError() {
        this.setState({ src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/drizzle.jpg" });
    },

    addVote: function addVote() {

        var component = this;
        var url = "/api/addvote";

        var title = this.props.data.title;
        var user = this.props.data.id;

        var params = "user=" + user + "&title=" + title;
        console.log(params);
        ajaxFunctions.postRequest("POST", url, params, function (data) {
            console.log(data);
            component.props.getPins();
        });
    },

    componentDidMount: function componentDidMount() {
        this.reduceTitle();
    },

    extendTitle: function extendTitle() {

        var titleStyle = {
            float: "center",
            width: "100%",
            height: "auto",
            Zindex: "999"
        };
        var component = this;

        var title = this.props.data.title;
        this.setState({ title: title, titleStyle: titleStyle }, function () {
            component.props.reload();
        });
    },

    reduceTitle: function reduceTitle() {

        var titleStyle = {
            float: "left",
            width: "80%"
        };

        var title = this.props.data.title;
        if (title.length > 20) {
            title = title.substr(0, 17) + "...";
        }

        this.setState({ title: title, titleStyle: titleStyle });
    },

    render: function render() {

        var inline = {
            display: "inline",
            float: "right",
            margin: "4px",
            marginRight: "6px",
            overflow: "hidden"
        };

        var left = {
            float: "left",
            color: "#1c2ac9"
        };

        var clear = {
            clear: "both",
            marginTop: "2px"
        };

        var href = "/user/" + "938484848";

        return React.createElement(
            "div",
            { className: "grid-item", onMouseOver: this.extendTitle, onMouseOut: this.reduceTitle },
            React.createElement("img", { onError: this.imgError, key: this.props.data.title + "," + this.props.data.url, src: this.state.src }),
            React.createElement(
                "div",
                { className: "details" },
                React.createElement(
                    "p",
                    { style: this.state.titleStyle },
                    " ",
                    this.state.title,
                    " "
                ),
                React.createElement(
                    "div",
                    { style: clear },
                    React.createElement(
                        "a",
                        { className: "user-link", href: href, style: left },
                        " ",
                        this.props.data.user,
                        " "
                    ),
                    React.createElement(
                        "p",
                        { style: inline },
                        " ",
                        this.props.data.upVotes.length,
                        " "
                    ),
                    " ",
                    React.createElement("i", { onClick: this.addVote, style: inline, className: "fa fa-heart" })
                )
            )
        );
    }
});

module.exports = RecentPin;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../common/ajax-functions.js":1}],14:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var AddPinModal = require("./AddPinModal.js");
var RecentPin = require("./RecentPin.js");
var ajaxFunctions = require("../common/ajax-functions.js");

var RecentPins = React.createClass({
  displayName: "RecentPins",


  getInitialState: function getInitialState() {
    return {
      pins: []
    };
  },

  componentDidMount: function componentDidMount() {
    this.getAllPins();
  },

  getAllPins: function getAllPins() {
    var url = "/api/getallpins";
    var component = this;
    ajaxFunctions.ajaxRequest("GET", url, function (data) {
      data = JSON.parse(data);
      console.log(data);
      component.setState({ pins: data }, function () {

        var elem = document.querySelector('.grid');
        var msnry = new Masonry(elem, {
          // options
          itemSelector: '.grid-item',
          transitionDuration: '0.8s'
        });

        imagesLoaded('.grid').on('progress', function () {
          // layout Masonry after each image loads
          msnry.layout();
        });
      });
    });
  },

  reloadMasonry: function reloadMasonry() {
    var elem = document.querySelector('.grid');
    var msnry = new Masonry(elem, {
      // options
      itemSelector: '.grid-item',
      transitionDuration: '0.8s'
    });

    imagesLoaded('.grid').on('progress', function () {
      // layout Masonry after each image loads
      msnry.layout();
    });
  },

  render: function render() {
    var component = this;
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "grid" },
        this.state.pins.map(function (pin) {
          return React.createElement(RecentPin, { reload: component.reloadMasonry, getPins: component.getAllPins, key: pin.title + "," + pin.url, data: pin });
        })
      )
    );
  }
});

module.exports = RecentPins;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../common/ajax-functions.js":1,"./AddPinModal.js":2,"./RecentPin.js":13}],15:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactBootstrap = (typeof window !== "undefined" ? window['ReactBootstrap'] : typeof global !== "undefined" ? global['ReactBootstrap'] : null);
var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;
var ajaxFunctions = require("../common/ajax-functions.js");
var SignupModal = React.createClass({
  displayName: "SignupModal",


  getInitialState: function getInitialState() {
    return {
      userOK: false,
      passwordOK: false
    };
  },

  sendForm: function sendForm() {

    var component = this;

    //IF PASSWORDS DONT MATCH
    if (component.state.password !== component.state.confirmPassword) {
      component.setState({ passwordMatch: "Your passwords do not match.", confirmPasswordAlert: "warning" });
      return;
    }

    //IF PASSWORD OR USER IS NOT ENTERED CORRECTLY / ALREADY USED
    if (!component.state.userOK || !component.state.passwordOK) {
      return;
    }

    //IF THERE IS NO CONFIRM PASSWORD
    if (!component.state.confirmPassword) {
      return;
    }

    //MAKE PARAMS HERE
    var url = "/signup";

    var username = this.state.user;
    var password = this.state.confirmPassword;
    console.log(username);
    var params = "username=" + username + "&password=" + password;
    console.log(params);
    ajaxFunctions.postRequest("POST", url, params, function (data) {
      if (data.length < 100) {
        component.setState({ errorMessage: data });
      } else {
        window.location.replace("/");
      }
    });
  },

  checkUsername: function checkUsername(e) {

    var component = this;
    var user = e.target.value;

    var url = "/checkuser/" + user;

    ajaxFunctions.ajaxRequest("GET", url, function (data) {
      console.log(data);
      data = JSON.parse(data);
      component.setState({ usernameMessage: data.message, userAlert: data.alert }, function () {
        if (data.alert === "success") {
          component.setState({ userOK: true });
        } else {
          component.setState({ userOK: false });
        }
      });
    });
  },

  addUser: function addUser(e) {
    var user = e.target.value;
    this.setState({ user: user });
  },

  addPassword: function addPassword(e) {
    var component = this;
    var password = e.target.value;
    this.setState({ password: password }, function () {
      if (component.state.password === "") {
        component.setState({ passwordMessage: "", passwordAlert: "success" });
      }
    });

    var regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/;

    var test = password.match(regex);

    if (test) {
      this.setState({ passwordMessage: "", passwordAlert: "success", passwordOK: true }, console.log(this.state));
    } else {
      this.setState({ passwordMessage: " Your password must be at least 8 characters and contain one uppercase letter, one lowercase letter, and one number", passwordAlert: "warning", passwordOK: false }, console.log(this.state));
    }
  },

  confirmPassword: function confirmPassword(e) {
    var component = this;
    this.setState({ confirmPassword: e.target.value }, function () {
      if (component.state.password !== component.state.confirmPassword) {
        component.setState({ passwordMatch: "Your passwords don't match!", confirmPasswordAlert: "warning" }, console.log(this.state));
      } else {
        component.setState({ passwordMatch: "", confirmPasswordAlert: "success" }, console.log(this.state));
      }
    });
  },

  createUserMarkup: function createUserMarkup(data, alertType) {
    if (!data) {
      return null;
    }

    return { __html: '<div class="alert alert-' + alertType + '">' + data + '</div>' };
  },

  createPasswordMarkup: function createPasswordMarkup(data, alertType) {
    if (!data) {
      return null;
    }
    return { __html: '<div class="alert alert-' + alertType + '">' + data + '</div>' };
  },

  createConfirmPasswordMarkup: function createConfirmPasswordMarkup(data, alertType) {
    if (!data) {
      return null;
    }
    return { __html: '<div class="alert alert-' + alertType + '">' + data + '</div>' };
  },

  createErrorMarkup: function createErrorMarkup(data) {
    if (!data) {
      return null;
    }
    return { __html: '<div class="alert alert-' + 'danger' + '">' + data + '</div>' };
  },

  render: function render() {

    var inline = {
      display: "inline"
    };

    var center = {
      textAlign: "center"
    };

    var image = {
      width: "100px",
      height: "100px"
    };

    var form = {
      textAlign: "center"
    };

    var margin = {
      margin: "10px"
    };

    return React.createElement(
      "div",
      null,
      React.createElement(
        Modal,
        { style: center, show: this.props.showMessage },
        React.createElement(
          Modal.Body,
          { style: center },
          React.createElement(
            "h2",
            null,
            " Sign Up  "
          ),
          React.createElement(
            "a",
            { className: "btn btn-social btn-twitter btn-block", href: "/auth/twitter" },
            React.createElement("span", { className: "fa fa-twitter" }),
            " Sign Up with Twitter"
          ),
          React.createElement(
            "h4",
            { className: "form-element" },
            " Or Sign Up With Username "
          ),
          React.createElement(
            "div",
            { className: "form-group" },
            React.createElement(
              "label",
              null,
              "Username"
            ),
            React.createElement("input", { type: "text", onBlur: this.addUser, onKeyUp: this.checkUsername, className: "form-control", name: "username", id: "username" })
          ),
          React.createElement("div", { dangerouslySetInnerHTML: this.createUserMarkup(this.state.usernameMessage, this.state.userAlert) }),
          React.createElement(
            "div",
            { className: "form-group" },
            React.createElement(
              "label",
              null,
              "Password"
            ),
            React.createElement("input", { type: "password", onKeyUp: this.addPassword, className: "form-control", name: "password" })
          ),
          React.createElement("div", { dangerouslySetInnerHTML: this.createPasswordMarkup(this.state.passwordMessage, this.state.passwordAlert) }),
          React.createElement(
            "div",
            { className: "form-group" },
            React.createElement(
              "label",
              null,
              "Confirm Password"
            ),
            React.createElement("input", { type: "password", onKeyUp: this.confirmPassword, className: "form-control", name: "confirmpassword", id: "password" }),
            React.createElement("div", { dangerouslySetInnerHTML: this.createConfirmPasswordMarkup(this.state.passwordMatch, this.state.confirmPasswordAlert) })
          ),
          React.createElement(
            "button",
            { type: "submit", onClick: this.sendForm, className: "btn btn-primary" },
            "Submit"
          ),
          React.createElement("div", { dangerouslySetInnerHTML: this.createErrorMarkup(this.state.errorMessage) })
        ),
        React.createElement(
          Modal.Footer,
          null,
          React.createElement(
            Button,
            { onClick: this.props.hideMessage },
            "Close"
          )
        )
      )
    );
  }
});

module.exports = SignupModal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../common/ajax-functions.js":1}],16:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var SignupModal = require("./SignupModal.js");
var LoginModal = require("./LoginModal.js");
var ajaxFunctions = require("../common/ajax-functions.js");

var PublicPin = require("./PublicPin.js");
var IndexContent = React.createClass({
    displayName: "IndexContent",


    getInitialState: function getInitialState() {
        return {
            pins: []
        };
    },

    componentDidMount: function componentDidMount() {

        this.loadMasonry();
    },

    loadMasonry: function loadMasonry() {

        var user = this.props.user.twitter.username;
        this.setState({ user: user, pins: this.props.user.pins }, function () {

            var elem = document.querySelector('.grid');
            var msnry = new Masonry(elem, {
                // options
                itemSelector: '.grid-item',
                columnWidth: 200
            });

            // element argument can be a selector string
            //   for an individual element
            var msnry = new Masonry('.grid', {
                // options
            });
            imagesLoaded('.grid').on('progress', function () {
                // layout Masonry after each image loads
                msnry.layout();
            });
        });
    },

    render: function render() {

        var component = this;
        return React.createElement(
            "div",
            { className: "public-container" },
            React.createElement(
                "h1",
                null,
                " Pins for ",
                this.state.user,
                " "
            ),
            React.createElement(
                "div",
                { className: "grid" },
                this.state.pins.map(function (pin) {
                    return React.createElement(PublicPin, { reload: component.loadMasonry, showMessage: component.props.showMessage, key: pin.title + "," + pin.url, data: pin });
                })
            )
        );
    }
});

module.exports = IndexContent;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../common/ajax-functions.js":1,"./LoginModal.js":9,"./PublicPin.js":12,"./SignupModal.js":15}],17:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ajaxFunctions = require("../common/ajax-functions.js");

var UserPin = React.createClass({
    displayName: "UserPin",


    getInitialState: function getInitialState() {
        return {
            src: this.props.data.url,
            titleStyle: {
                float: "left",
                width: "80%",
                transition: "transition: all 0.5s ease"
            }
        };
    },

    imgError: function imgError() {
        this.setState({ src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/drizzle.jpg" });
    },

    deletePin: function deletePin() {

        var component = this;
        var url = "/api/deletepin";

        var imgUrl = this.props.data.url;
        var title = this.props.data.title;
        var date = this.props.data.date;

        var params = "url=" + imgUrl + "&title=" + title + "&date=" + date;
        console.log(params);
        ajaxFunctions.postRequest("POST", url, params, function (data) {
            console.log(data);
            component.props.getMyPins();
        });
    },

    componentDidMount: function componentDidMount() {
        this.reduceTitle();
    },

    extendTitle: function extendTitle() {

        var titleStyle = {
            float: "center",
            width: "100%",
            height: "auto",
            Zindex: "999"
        };
        var component = this;

        var title = this.props.data.title;
        this.setState({ title: title, titleStyle: titleStyle }, function () {
            component.props.reload();
        });
    },

    reduceTitle: function reduceTitle() {

        var titleStyle = {
            float: "left",
            width: "80%"
        };

        var title = this.props.data.title;
        if (title.length > 20) {
            title = title.substr(0, 17) + "...";
        }

        this.setState({ title: title, titleStyle: titleStyle });
    },

    render: function render() {

        var inline = {
            display: "inline",
            float: "right",
            margin: "4px",
            marginRight: "6px",
            overflow: "hidden"
        };

        var left = {
            float: "left",
            width: "80%",
            height: "10px"
        };

        var clear = {
            clear: "both",
            marginTop: "2px"
        };

        return React.createElement(
            "div",
            { className: "grid-item", onMouseOver: this.extendTitle, onMouseOut: this.reduceTitle },
            React.createElement("img", { onError: this.imgError, key: this.props.data.title + "," + this.props.data.url, src: this.state.src }),
            React.createElement(
                "div",
                { className: "details" },
                React.createElement(
                    "p",
                    { style: this.state.titleStyle },
                    " ",
                    this.state.title,
                    " "
                ),
                React.createElement(
                    "div",
                    { style: clear },
                    React.createElement(
                        "p",
                        { style: left },
                        " ",
                        this.props.data.user,
                        " "
                    ),
                    React.createElement(
                        "p",
                        { style: inline },
                        " ",
                        this.props.data.upVotes.length,
                        " "
                    ),
                    " ",
                    React.createElement("i", { style: inline, className: "fa fa-heart" }),
                    React.createElement(
                        "i",
                        { onClick: this.deletePin, className: "fa fa-times" },
                        " Remove "
                    )
                )
            )
        );
    }
});

module.exports = UserPin;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../common/ajax-functions.js":1}],18:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var Header = require("./Header.js");
var ReactDOM = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);
var IndexHeader = require("./IndexHeader.js");

//GET PROPS

var index = document.getElementById("index-react-holder");
var dashboard = document.getElementById("dashboard-react-holder");
var user = document.getElementById("user-react-holder");

if (dashboard) {
	//RENDER CONTAINER
	var pins = JSON.parse(document.getElementById("pins").innerHTML);
	ReactDOM.render(React.createElement(Header, { pins: pins, title: "The Visual Network" }), document.getElementById("dashboard-react-holder"));
} else if (index) {
	var pins = JSON.parse(document.getElementById("pins").innerHTML);
	ReactDOM.render(React.createElement(IndexHeader, { pins: pins, type: "index", title: "The Visual Network" }), document.getElementById("index-react-holder"));
} else if (user) {
	var userProps = JSON.parse(document.getElementById("userProps").innerHTML);
	ReactDOM.render(React.createElement(IndexHeader, { userProps: userProps, type: "user", title: "The Visual Network" }), document.getElementById("user-react-holder"));
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Header.js":4,"./IndexHeader.js":8}]},{},[18]);
