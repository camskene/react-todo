const React = require('react');
const Firebase = require('firebase');

const rootUrl = 'https://fiery-fire-7124.firebaseio.com/';

const ListItem = React.createClass({
  getInitialState() {
    return {
      text: this.props.item.text,
      done: this.props.item.done,
      textChanged: false,
    };
  },

  componentWillMount() {
    this.fb = new Firebase(`${rootUrl}items/${this.props.item.key}`);
  },

  render() {
    return (
      <div className="input-group">
        <span className="input-group-addon">
          <input type="checkbox" checked={this.state.done} onChange={this.handleDoneChange} />
        </span>
        <input type="text" disabled={this.state.done} className="form-control" value={this.state.text} onChange={this.handleTextChange} />
        <span className="input-group-btn">
          {this.changesButtons()}
          <button className="btn btn-default"onClick={this.handleDeleteClick}>
            Delete
          </button>
        </span>
      </div>
    );
  },

  handleDoneChange(event) {
    const update = { done: event.target.checked };
    this.setState(update);
    this.fb.update(update);
  },

  handleDeleteClick() {
    this.fb.remove();
  },

  handleTextChange(event) {
    this.setState({
      text: event.target.value,
      textChanged: true,
    });
  },

  handleSaveClick() {
    this.fb.update({ text: this.state.text });
    this.setState({ textChanged: false });
  },

  handleUndoClick() {
    this.setState({
      text: this.props.item.text,
      textChanged: false,
    });
  },

  changesButtons() {
    if (!this.state.textChanged) {
      return null;
    }

    return [
      <button className="btn btn-default" onClick={this.handleSaveClick}>
        Save
      </button>,
      <button className="btn btn-default" onClick={this.handleUndoClick}>
        Undo
      </button>,
    ];
  },
});

module.exports = ListItem;
