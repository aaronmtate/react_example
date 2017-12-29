var SortColumn = createReactClass({
  handleSort: function(e) {
    e.preventDefault();
    var direction = this.props.direction == 'desc' ? 'asc' : 'desc';
    this.props.handleSortColumn(this.props.name, direction);
  },

  render: function() {
    var active = this.props.sort_by == this.props.name;
    var display_name = active ? <u>{this.props.text}</u> : this.props.text;
    var direction;

    if (active) {
      direction = this.props.direction == 'asc' ? <span className='glyphicon glyphicon-chevron-up' aria-hidden='true'></span> : <span className='glyphicon glyphicon-chevron-down' aria-hidden='true'></span>
    }

    return(
      <span onClick={this.handleSort}>
        {display_name}
        {direction}
      </span>
    );
  }
});
