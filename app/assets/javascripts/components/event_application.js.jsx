var EventApplication = createReactClass({
  getInitialState: function() {
    return { events: [], query: '', sort_by: 'event_date', direction: 'asc', page: 1, pages: 0 };
  },

  componentDidMount: function() {
    this.getDataFromApi();
  },

  getDataFromApi: function(query, sort_by, direction, page) {
    query = query || this.state.query;
    sort_by = sort_by || this.state.sort_by;
    direction = direction || this.state.direction;
    page = page || this.state.page;

    $.ajax({
      url: '/api/events',
      data: { query: query, sort_by: sort_by, direction: direction, page: page },
      method: 'GET',
      success: function(data) {
        this.setState({ events: data.events, query: query, sort_by: data.sort_by, direction: data.direction, pages: parseInt(data.pages), page: parseInt(data.page) });
      }.bind(this),
      error: function(xhr, status, error) {
        alert('Cannot get data from API: ', status, xhr, error);
      }
    });
  },

  handleSearch: function(query) {
    this.getDataFromApi(query);
  },

  handleAdd: function(event) {
    this.getDataFromApi();
  },

  handleUpdateRecord: function(old_event, event) {
    var events = this.state.events.slice();
    var index = events.indexOf(old_event);
    events.splice(index, 1, event);
    this.setState({ events: events });
  },

  handleDeleteRecord: function(event) {
    this.getDataFromApi();
  },

  handleSortColumn: function(field_name, direction) {
    if (this.state.sort_by != field_name) {
      direction = 'asc';
    }

    this.getDataFromApi(undefined, field_name, direction, undefined);
  },

  handleChangePage: function(page) {
    this.getDataFromApi(undefined, undefined, undefined, page);
  },

  render: function() {
    return(
      <div className = "container">
        <div className = "jumbotron">
          <h1>ReactJS Tutorial</h1>
          <p>by Piotr Jaworski</p>
        </div>
        <div className = "row">
          <div className = "col-md-4">
            <SearchForm handleSearch={this.handleSearch} />
          </div>
          <div className = "col-md-8">
            <NewForm handleAdd={this.handleAdd} />
          </div>
        </div>
        <div className = "row">
          <div className = "col-md-12">
            <EventTable events={this.state.events}
                        sort_by={this.state.sort_by}
                        direction={this.state.direction}
                        handleDeleteRecord={this.handleDeleteRecord}
                        handleUpdateRecord={this.handleUpdateRecord}
                        handleSortColumn={this.handleSortColumn} />
            <Pagination page={this.state.page}
                        pages={this.state.pages}
                        handleChangePage={this.handleChangePage} />
          </div>
        </div>
      </div>
    )
  }
});
