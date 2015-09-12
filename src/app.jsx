var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var rootUrl = 'https://fiery-fire-7124.firebaseio.com/';

var App = React.createClass({
  mixins: [ReactFire], // copy React methods to our component
  componentWillMount: function() { // fired once before initial render
    this.bindAsObject(new Firebase(rootUrl + 'items/'), 'items');
  },
  render: function() {
    console.log(this.state);
    return <h1 className="red">
      Hello ReactJS!
    </h1>
  }
});

var element = React.createElement(App, {});
React.render(element, document.querySelector('.container'));
