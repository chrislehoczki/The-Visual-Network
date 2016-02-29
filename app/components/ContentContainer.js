
var React = require('react');

var Profile = require("./Profile.js")
var MyPins = require("./MyPins.js")
var RecentPins = require("./RecentPins.js")
var ContentContainer = React.createClass({

    getInitialState: function() {
    return { 
    };
    },

    render: function() {

       return (
       	  <div className="content-container">
          
          
            	{this.props.tab === "Recent Pins" ?
                          <div>
                          <h1> The Visual Network </h1>
                          <h2> Create collections and share your images. </h2> 
                          <RecentPins pins={this.props.pins}/>
                          </div>
                          :null}
              {this.props.tab === "My Pins" ?
                          <div>
                          <h1> My Pins </h1>
                          <MyPins pins={this.props.pins} />
                          </div>
                          :null}
              {this.props.tab === "Profile" ?
                          
                          <Profile />
                          :null}
  			</div>
  );
     }  




});
module.exports=ContentContainer