const React = require('react');
const ReactFire = require('reactfire');
const Firebase = require('firebase');
const Header = require('./header');
const List = require('./list');

const rootUrl = 'https://fiery-fire-7124.firebaseio.com/';

const App = React.createClass({
  mixins: [ReactFire],                      // copy ReactFire methods to our component
  getInitialState() {
    return {
      items: {},
      loaded: false,
    };
  },

  componentWillMount() {
    this.fb = new Firebase(`${rootUrl}items/`);  // make the data stored at firebaseio.com/items an object and
    this.bindAsObject(this.fb, 'items');         // make it available as this.state.items within the component
    this.fb.on('value', this.handleDataLoaded);  // listen for data changes
  },

  render() {
    return (
      <div className="row panel panel-default">
        <div className="col-md-8 col-md-offset-2">
          <h2 className="text-center">
            To-Do List
          </h2>
          <Header itemsStore={this.firebaseRefs.items} />
          <hr />
          <div className={`content ${(this.state.loaded ? 'loaded' : '')}`}>
            <List items={this.state.items} />
            {this.deleteButton()}
          </div>
        </div>
      </div>
    );
  },

  deleteButton() {
    if (!this.state.loaded) {
      return false;
    }

    return (
      <div className="text-center clear-complete">
        <hr />
        <button type="button" onClick={this.onDeleteDoneClick} className="btn btn-default">
          Clear Complete
        </button>
      </div>
    );
  },

  onDeleteDoneClick() {
    for (var key in this.state.items) {
      if (this.state.items[key].done === true) {
        this.fb.child(key).remove();
      }
    }
  },

  handleDataLoaded() {
    this.setState({ loaded: true });
  },
});

const element = React.createElement(App, {});
React.render(element, document.querySelector('.container'));
