var React = require('react');
var AddPinModal = require("./AddPinModal.js")
var RecentPin = require("./RecentPin.js")
var ajaxFunctions = require("../common/ajax-functions.js")



var RecentPins = React.createClass({

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

          
            var elem = document.querySelector('.grid');
           var msnry = new Masonry( elem, {
          // options
          itemSelector: '.grid-item',
          transitionDuration: '0.8s'
            });

                imagesLoaded( '.grid' ).on( 'progress', function() {
        // layout Masonry after each image loads
        msnry.layout();
      });
      })
      })

    },

    reloadMasonry: function() {
      var elem = document.querySelector('.grid');
           var msnry = new Masonry( elem, {
          // options
          itemSelector: '.grid-item',
          transitionDuration: '0.8s'
            });

                imagesLoaded( '.grid' ).on( 'progress', function() {
        // layout Masonry after each image loads
        msnry.layout();
      });
    },


    render: function() {
            var component = this;
       return (

            <div> 
            
            <div className="grid">
                       {this.state.pins.map(function(pin) {
                     return <RecentPin reload={component.reloadMasonry} getPins={component.getAllPins} key={pin.title + "," + pin.url} data={pin}/> 
                         })}
            </div>
    
      
    
            </div>
        );
  
  
      }
});

module.exports=RecentPins