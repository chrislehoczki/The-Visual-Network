

var React = require('react');




var PublicPin = React.createClass({

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

    loginMessage: function() {
      this.props.showMessage()
    },

    render: function() {
        

            var inline = {
             display: "inline",
             float: "right",
             margin: "2px",
             marginRight: "5px",
             overflow: "hidden"
            }

            var left = {
              float: "left",
              width: "80%",
              height: "10px",
              color: "#1c2ac9"
            }

            var clear = {
              clear: "both",
              marginTop: "2px"
            }

            var href = "/user/" + this.props.data.id

       return (

        <div className="grid-item" onMouseOver={this.extendTitle} onMouseOut={this.reduceTitle}>
        <img onError={this.imgError} key= {this.props.data.title + "," + this.props.data.url} src={this.state.src} />
        <div className="details">
        <p style={this.state.titleStyle}> {this.state.title} </p>
        
        <div style={clear}>
        <a className="user-link" href={href} style={left}> {this.props.data.user} </a>
        <p style={inline}> {this.props.data.upVotes.length} </p> <i onClick={this.loginMessage} style={inline} className="fa fa-heart"></i>
        </div>
        </div>
        </div>

           
        );
  
  
      }
});

module.exports=PublicPin
