var React = require('react');
var HeaderButtons = require("./HeaderButtons.js")
var ContentContainer = require("./ContentContainer.js")
var SignupModal = require("./SignupModal.js")
var LoginModal = require("./LoginModal.js")
var ajaxFunctions = require("../common/ajax-functions.js")
var IndexContent = require("./IndexContent.js")
var UserContent = require("./UserContent.js")


var Header = React.createClass({


    getInitialState: function() {
    return { 
      showModal: false,
      showLoginModal: false
    };
    },

    showMessage: function () {
      this.setState({showModal: true})
    },

    hideMessage: function () {
      this.setState({showModal: false})
    },

    showLoginModal: function() {
        this.setState({showLoginModal: true})

    },

    hideLoginModal: function () {
      this.setState({showLoginModal: false})
    },

    changeModal: function() {
      this.setState({showLoginModal: false}) 
      this.setState({showModal: true})     
    },

    render: function() {
      var component = this;

      //THIS FUNCTION DECLARES WHETHER IT IS INDEX PAGE OR SPECIFIC USER PAGE THAT IS RENDERED
      function changeContent () {
          var contentContainer;
          
        if (component.props.type === "index") {
          return <IndexContent showMessage={component.showMessage} />;
        }
        else if (component.props.type === "user") {
          return <UserContent showMessage={component.showMessage} user={component.props.userProps}/>
        }
      


      }


       return (
          <div>
            <div className="header">
                <p className="public-title"> {this.props.title} </p>
                <button onClick={this.showLoginModal}  className="public-btn-header btn btn-primary"> Log In </button>
                <button onClick={this.showMessage} className="public-btn-header btn btn-primary"> Sign Up </button>
            </div>

            {changeContent()}
            <SignupModal showMessage={this.state.showModal} hideMessage={this.hideMessage}/>
            <LoginModal changeModal={this.changeModal} showMessage={this.state.showLoginModal} hideMessage={this.hideLoginModal}/>
          </div>
        );
  
  
      }
});

module.exports=Header