const React = require('react');

const Header = React.createClass({
  getInitialState() {
    return {
      text: '',
    };
  },

  render() {
    return (
      <div className="input-group">
        <input value={this.state.text} onChange={this.handleInputChange} type="text"className="form-control" />
        <span className="input-group-btn">
          <button onClick={this.handleClick} className="btn btn-default" type="button">
            Add
          </button>
        </span>
      </div>
    );
  },

  handleClick() {
    // send value of text input to Firebase
    this.props.itemsStore.push({
      text: this.state.text,
      done: false,
    });

    this.setState({ text: '' });
  },

  handleInputChange(event) {
    this.setState({ text: event.target.value });
  },
});

module.exports = Header;
