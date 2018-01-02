var SearchForm = createReactClass({
  handleSearch: function() {
    var query = ReactDOM.findDOMNode(this.refs.query).value;
    this.props.handleSearch(query);
  },

  render: function() {
    return(
      <input onChange={this.handleSearch} type='text' className='form-control' placeholder='Type search phrase here...' ref='query' />
    )
  }
});