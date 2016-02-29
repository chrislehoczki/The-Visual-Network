var React = require('react');
var HeaderButtons = require("./HeaderButtons.js")
var ContentContainer = require("./ContentContainer.js")

var ajaxFunctions = require("../common/ajax-functions.js")

var Header = React.createClass({

    getInitialState: function() {
    return { 
      tab: "Recent Pins"
    };
    },

    componentDidMount: function() {
      //this.getAllPins()

    },

    getAllPins: function() {
      var url = "/api/getallpins"
      var component = this;
      ajaxFunctions.ajaxRequest("GET", url, function(data) {
        console.log(data)
        component.setState({pins: data})
      })

    },

    changeTab: function(tabName) {
      if (tabName !== "Sign Out") {
          this.setState({tab: tabName});
        }
        
      
    },

    render: function() {

       return (
          <div>
            <div id="rct-header" className="header">
              <div id="title-bundle">
                <p id="rct-title" className="title"> {this.props.title} </p>
              </div>
              <div id="button-bundle">
                <HeaderButtons changeTab={this.changeTab} links={["Sign Out", "Profile", "My Pins", "Recent Pins"]}/>
              </div>
            </div>
            <ContentContainer pins={this.props.pins} tab={this.state.tab} />
          </div>
        );
  
  
      }
});

module.exports=Header