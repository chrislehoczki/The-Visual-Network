

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
      this.getAllPins()
    },

    getAllPins: function() {
       var url = "/api/getallpins"
      var component = this;
      ajaxFunctions.ajaxRequest("GET", url, function(data) {
        data= JSON.parse(data)
        console.log(data)
        component.setState({pins: data}, function() {
          component.loadMasonry()
          
      })
      })

    },

    loadMasonry: function() {

            var elem = document.querySelector('.grid');
           var msnry = new Masonry( elem, {
          // options
          itemSelector: '.grid-item',
          transitionDuration: '0.8s'
          
            });

                // element argument can be a selector string
                //   for an individual elemen

                imagesLoaded( '.grid' ).on( 'progress', function() {
        // layout Masonry after each image loads
        msnry.layout();
      });

    },

    render: function() {

      var component = this;

      var buttonStyle = {
        margin: "0px auto",
        width: "300px",
        display: "block"
      }
       return (
          <div className="public-container">
           
           <h1> The Visual Network </h1>
           <h2> Create collections and share your images. </h2> 
            <a style={buttonStyle} className="btn btn-social btn-twitter" href="/auth/twitter">
            <span className="fa fa-twitter"></span> Sign In with Twitter</a>
           <div className="grid">
                      {this.state.pins.map(function(pin) {
           	return <PublicPin reload={component.loadMasonry} showMessage={component.props.showMessage} key={pin.title + "," + pin.url} data={pin}/> 
           })}
                      </div>
 			
				
          </div>
           
        );
  
  
      }
});

module.exports=IndexContent