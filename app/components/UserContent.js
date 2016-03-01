

var React = require('react');
var SignupModal = require("./SignupModal.js")
var LoginModal = require("./LoginModal.js")
var ajaxFunctions = require("../common/ajax-functions.js")

var PublicPin = require("./PublicPin.js")
var IndexContent = React.createClass({


    getInitialState: function() {
    return { 
    	pins: []
    };
    },

    componentDidMount: function() {
     

      $(".grid").hide()
      this.loadMasonry()
      $(".grid").fadeIn(3000)

    },

    loadMasonry: function() {

      var user = this.props.user.twitter.username
      this.setState({user: user, pins: this.props.user.pins}, function() {

              var elem = document.querySelector('.grid');
      var msnry = new Masonry( elem, {
        // options
        itemSelector: '.grid-item',
        columnWidth: 200
      });

      // element argument can be a selector string
      //   for an individual element
      var msnry = new Masonry( '.grid', {
      // options
      });
      imagesLoaded( '.grid' ).on( 'progress', function() {
        // layout Masonry after each image loads
        msnry.layout();
      });


      })
    },



    render: function() {

      var component = this;
       return (
          <div className="public-container">
           
           <h1> Pins for {this.state.user} </h1>
           <div className="grid">
                      {this.state.pins.map(function(pin) {
           	return <PublicPin reload={component.loadMasonry} showMessage={component.props.showMessage} key= {pin.title + "," + pin.url} data={pin}/> 
           })}
                      </div>
 			
				
          </div>
           
        );
  
  
      }
});

module.exports=IndexContent