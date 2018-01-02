var SearchForm = createReactClass({
  handleSearch: function() {
    var query = ReactDOM.findDOMNode(this.refs.query).value;
    var self = this;

    $.ajax({
      url: '/api/events',
      data: { query: query, sort_by: this.props.sort_by, direction: this.props.direction, page: this.props.page },
      success: function(data) {
        self.props.handleSearch(data, query);
      },
      error: function(xhr, status, error) {
        alert('Search error: ', status, xhr, error);
      }
    });
  },

  render: function() {
    return(
      <input onChange={this.handleSearch} type='text' className='form-control' placeholder='Type search phrase here...' ref='query' />
    )
  }
});