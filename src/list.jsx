const React = require('react');
const ListItem = require('./list-item');

const List = React.createClass({
  render() {
    if (!this.props.items) {
      return <h4>Add a todo to get started</h4>;
    }

    return (
      <div>
        {Object.keys(this.props.items).map((key) => {
          const item = this.props.items[key];
          item.key = key;
          return <ListItem item={item} key={key} />;
        })}
      </div>
    );
  },
});

module.exports = List;
