

var React = require('react');
var ajaxFunctions = require("../common/ajax-functions.js")



var UserPin = React.createClass({

      getInitialState: function() {
      return {
        src: this.props.data.url,
        titleStyle: {
              float: "left",
              width: "80%",
              transition: "transition: all 0.5s ease"
            }
      }

    },


    imgError: function() {
      this.setState({src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/drizzle.jpg"})
    },

    deletePin: function() {


      var component = this;
      var url = "/api/deletepin"

       var imgUrl = this.props.data.url;
       var title = this.props.data.title;
       var date = this.props.data.date;

      var params = "url=" + imgUrl + "&title=" + title + "&date=" + date ;
        console.log(params)
      ajaxFunctions.postRequest("POST", url, params, function(data) {
          console.log(data)
          component.props.getMyPins()
      })

    },

    componentDidMount: function() {
      this.reduceTitle();

    },

    extendTitle: function () {

      var titleStyle = {
              float: "center",
              width: "100%",
              height: "auto",
              Zindex: "999"
            }
      var component = this;

      
      var title = this.props.data.title;
      this.setState({title: title, titleStyle: titleStyle}, function() {
        component.props.reload()
      })

    },

    reduceTitle: function () {

      var titleStyle = {
              float: "left",
              width: "80%"
            }

      var title = this.props.data.title;
      if (title.length > 20) {
        title = title.substr(0, 17) + "..."
      }

      this.setState({title: title, titleStyle: titleStyle})
    },


    render: function() {
        

            var inline = {
             display: "inline",
             float: "right",
             margin: "4px",
             marginRight: "6px",
             overflow: "hidden"
            }

            var left = {
              float: "left",
              width: "80%",
              height: "10px"
            }

            var clear = {
              clear: "both",
              marginTop: "2px"
            }

       return (

         <div className="grid-item" onMouseOver={this.extendTitle} onMouseOut={this.reduceTitle}>
        <img onError={this.imgError} key= {this.props.data.title + "," + this.props.data.url} src={this.state.src} />
        <div className="details">
        <p  style={this.state.titleStyle}> {this.state.title} </p>
        
        <div style={clear}>
        <p style={left}> {this.props.data.user} </p>
        <p style={inline}> {this.props.data.upVotes.length} </p> <i style={inline} className="fa fa-heart"></i>
        <i onClick={this.deletePin} className="fa fa-times"> Remove </i>
        </div>
        </div>
        </div>

           
        );
  
  
      }
});

module.exports=UserPin