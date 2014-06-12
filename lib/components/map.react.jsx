var React = require('react');
var tiny = require('tinytinycolor');

var Map = React.createClass({

  propTypes: {
    h: React.PropTypes.number.isRequired,
    s: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      onChange: function () {}
    };
  },

  getInitialState: function () {
    return {
      active: false
    };
  },

  componentDidMount: function () {
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  },

  handleMouseDown: function () {
    this.setState({
      active: true
    });
  },

  handleMouseMove: function (e) {
    if (! this.state.active) return;
    var el = this.getDOMNode();
    var rect = el.getBoundingClientRect();
    var hue = (e.clientX - rect.left) / rect.width;
    var sat = (e.clientY - rect.top) / rect.height;

    if (hue < 0) hue = 0;
    else if (hue > 1) hue = 1;
    hue *= 360;

    if (sat < 0) sat = 0;
    else if (sat > 1) sat = 1;
    sat = 1 - sat;

    this.props.onChange(hue, sat);
  },

  handleMouseUp: function () {
    if (! this.state.active) return;
    this.setState({
      active: false
    });
  },


  render: function () {
    return (
      <div className="map" onMouseDown={this.handleMouseDown}>
        <div className="background" />
        <div className="pointer" style={{
          top: (100 - this.props.s * 100) + '%',
          left: this.props.h / 360 * 100 + '%'
        }} />
      </div>
    );
  }

});

module.exports = Map;