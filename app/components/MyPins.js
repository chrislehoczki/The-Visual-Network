var React = require('react');
var AddPinModal = require("./AddPinModal.js")
var UserPin = require("./UserPin.js")
var ajaxFunctions = require("../common/ajax-functions.js")



var MyPins = React.createClass({

    getInitialState: function() {
    return { 
      showModal: false,
      pins: []
    };
    },

    componentDidMount: function() {
       $(".grid").hide()
      this.getMyPins()
      $(".grid").fadeIn(3000)
    },

    getMyPins: function() {
      var url = "/api/getuserpins"
      var component = this;
      ajaxFunctions.ajaxRequest("GET", url, function(data) {
        data= JSON.parse(data)
        console.log(data)
        component.setState({pins: data.pins}, function() {
                   
                  component.reloadMasonry()
          
        })
      })

    },

    showMessage: function () {
      this.setState({showModal: true})
    },

    hideMessage: function () {
      this.setState({showModal: false})
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

            var addPin = {
              width: "300px",
              padding: "10px",
              margin: "40px auto",
              display: "block"
            }
       return (

            <div> 
            
            <button style={addPin} className="btn btn-primary" onClick={this.showMessage}> Add Pin </button>
            <div className="grid">
                       {this.state.pins.map(function(pin) {
                     return <UserPin reload={component.reloadMasonry} getMyPins={component.getMyPins} key= {pin.title + "," + pin.url} data={pin}/> 
                         })}
            </div>
    
      
              


            <AddPinModal getMyPins={component.getMyPins} showMessage={this.state.showModal} hideMessage={this.hideMessage} />
            </div>
        );
  
  
      }
});

module.exports=MyPins