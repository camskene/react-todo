var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var rootUrl = 'https://fiery-fire-7124.firebaseio.com/';
var Header = require('./header');
var List = require('./list');

var App = React.createClass({
  mixins: [ReactFire],                      // copy ReactFire methods to our component
  getInitialState: function() {
    return {
      items: {},
      loaded: false
    }
  },
  componentWillMount: function() {
    fb = new Firebase(rootUrl + 'items/');  // make the data stored at firebaseio.com/items an object and
    this.bindAsObject(fb, 'items');         // make it available as this.state.items within the component
    fb.on('value', this.handleDataLoaded);  // listen for data changes
  },
  render: function() {
    return <div className="row panel panel-default">
      <div className="col-md-8 col-md-offset-2">
        <h2 className="text-center">
          To-Do List
        </h2>
        <Header itemsStore={this.firebaseRefs.items} />
        <hr />
        <div className={"content " + (this.state.loaded ? 'loaded' : '')}>
          <List items={this.state.items} />
        </div>
      </div>
    </div>
  },
  handleDataLoaded: function() {
    this.setState({loaded: true});
  }
});

var element = React.createElement(App, {});
React.render(element, document.querySelector('.container'));
