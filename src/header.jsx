var React = require('react');

var Header = React.createClass({
  render: function() {
    return <div className="input-group">
      <input type="text" className="form-control" />
      <span className="input-group-btn">
        <button className="btn btn-default" type="button">
          Add
        </button>
      </span>
    </div>
  }
});

module.exports = Header;
