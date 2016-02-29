var React = require('react');
var ReactBootstrap = require("react-bootstrap")
var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;
var ajaxFunctions = require("../common/ajax-functions.js")
var AddPinModal= React.createClass({


        getInitialState: function() {
    return { 
      url: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRshP-HTInRkI265bTUoAjix4nc-Mwmh7uWJ_o14CFvow5du6PJOGb_BoQ"
    };
    },

    changeUrl: function(e) {
      var url = e.target.value;

      this.setState({url: url})
    },

    changeTitle: function(e) {

      var title = e.target.value;
      this.setState({title: title})
    },

    addPin: function() {

      var component = this;
      var url = "/api/addpin"

       var imgUrl = this.state.url;
       var title = this.state.title;

      var params = "url=" + imgUrl + "&title=" + title;
        console.log(params)
      ajaxFunctions.postRequest("POST", url, params, function(data) {
          console.log(data)
          component.props.getMyPins()
          component.props.hideMessage()
      })

    },

    render: function() {

    	var inline = {
    		display: "inline",
    	}

    	var center = {
    		textAlign: "center"
    	}

      var image = {
        width: "100px",
        height: "100px",
        margin: "5px auto",
        display: "block"
      }

      var form = {
        textAlign: "center"
      }

       return (
 		  <div>
        <Modal style={center} show={this.props.showMessage} >
        

          <Modal.Body>

            <img style={image} src={this.state.url} />
            <h2> Add Your Pin </h2>

            <div className="form-group">
            <label>Pin Url</label>
            <input type="text" onBlur={this.changeUrl} className="form-control" name="url" />
            </div>

            <div className="form-group">
            <label>Pin Title</label>
            <input type="text" onKeyUp={this.changeTitle} className="form-control" name="title" />
            </div>

            

            <button onClick={this.addPin} type="submit" className="btn btn-primary">Submit</button>

          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.props.hideMessage}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
        );
  
  
      }
});

module.exports=AddPinModal;

